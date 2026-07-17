import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/translate
// body: { postId?: string, commentId?: string, targetLocale: "FR" | "EN" }
//
// Traduzione on-demand: l'utente clicca "Traduire/Translate" sul singolo post/commento.
// Il contenuto ORIGINALE non viene mai modificato: si crea solo una entry Translation in cache,
// così la stessa traduzione non viene richiesta due volte a DeepL.
export async function POST(req: NextRequest) {
  const { postId, commentId, targetLocale } = await req.json();

  if (!postId && !commentId) {
    return NextResponse.json({ error: "postId o commentId richiesto" }, { status: 400 });
  }
  if (targetLocale !== "FR" && targetLocale !== "EN") {
    return NextResponse.json({ error: "targetLocale non valido" }, { status: 400 });
  }

  // 1. Controlla se la traduzione è già in cache
  const cached = await prisma.translation.findFirst({
    where: postId ? { postId, targetLocale } : { commentId, targetLocale },
  });
  if (cached) return NextResponse.json({ text: cached.text, cached: true });

  // 2. Recupera il testo originale
  const source = postId
    ? await prisma.post.findUnique({ where: { id: postId } })
    : await prisma.comment.findUnique({ where: { id: commentId } });

  if (!source) return NextResponse.json({ error: "Contenuto non trovato" }, { status: 404 });

  const originalText = "body" in source ? source.body : "";

  // 3. Chiama l'API DeepL (richiede DEEPL_API_KEY in .env)
  const deeplRes = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      text: originalText,
      target_lang: targetLocale,
    }),
  });

  if (!deeplRes.ok) {
    return NextResponse.json({ error: "Servizio di traduzione non disponibile" }, { status: 502 });
  }

  const data = await deeplRes.json();
  const translatedText: string = data.translations?.[0]?.text ?? "";

  // 4. Salva in cache
  await prisma.translation.create({
    data: {
      targetLocale,
      text: translatedText,
      postId: postId ?? undefined,
      commentId: commentId ?? undefined,
    },
  });

  return NextResponse.json({ text: translatedText, cached: false });
}
