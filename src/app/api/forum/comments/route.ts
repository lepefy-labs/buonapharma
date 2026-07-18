import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

const RATE_LIMIT_ERROR = "Trop de publications récentes. Réessayez dans quelques minutes.";

const createCommentSchema = z.object({
  postId: z.string().min(1),
  body: z.string().trim().min(5).max(3000),
  locale: z.enum(["FR", "EN"]),
});

// POST /api/forum/comments
// Space PHARMACIENS: seuls les PHARMACIST_VERIFIED / ADMIN peuvent commenter (espace privé).
// Space PATIENTS: tout utilisateur authentifié peut commenter ; isFromPharmacist est dérivé
// du rôle de l'auteur (jamais envoyé par le client) et marque le sujet comme répondu.
export async function POST(req: NextRequest) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  const userId = (session?.user as any)?.id;

  if (!session || !userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const rawBody = await req.json().catch(() => null);
  if (!rawBody || typeof rawBody !== "object" || typeof rawBody.postId !== "string") {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { id: rawBody.postId } });
  if (!post) {
    return NextResponse.json({ error: "Sujet non trouvé" }, { status: 404 });
  }

  if (post.space === "PHARMACIENS" && role !== "PHARMACIST_VERIFIED" && role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const rateLimit = await checkRateLimit(userId, "comment", { maxRequests: 15, windowMinutes: 15 });
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: RATE_LIMIT_ERROR }, { status: 429 });
  }

  const parsed = createCommentSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const isFromPharmacist = role === "PHARMACIST_VERIFIED" || role === "ADMIN";

  const comment = await prisma.comment.create({
    data: {
      postId: parsed.data.postId,
      authorId: userId,
      body: parsed.data.body,
      originalLocale: parsed.data.locale,
      isFromPharmacist,
    },
  });

  if (post.space === "PATIENTS" && isFromPharmacist && !post.isAnswered) {
    await prisma.post.update({ where: { id: post.id }, data: { isAnswered: true } });
  }

  return NextResponse.json({ id: comment.id }, { status: 201 });
}
