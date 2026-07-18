import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

const RATE_LIMIT_ERROR = "Trop de publications récentes. Réessayez dans quelques minutes.";

const createPostSchema = z.object({
  space: z.enum(["PHARMACIENS", "PATIENTS"]),
  categoryId: z.string().min(1),
  title: z.string().trim().min(3).max(150),
  body: z.string().trim().min(10).max(5000),
  locale: z.enum(["FR", "EN"]),
});

// POST /api/forum/posts
// Space PHARMACIENS: réservé aux PHARMACIST_VERIFIED / ADMIN (espace privé entre pharmaciens).
// Space PATIENTS: ouvert à tout utilisateur authentifié.
export async function POST(req: NextRequest) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  const userId = (session?.user as any)?.id;

  if (!session || !userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const rawBody = await req.json().catch(() => null);
  if (!rawBody || typeof rawBody !== "object") {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  if (rawBody.space === "PHARMACIENS" && role !== "PHARMACIST_VERIFIED" && role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  if (rawBody.space !== "PHARMACIENS" && rawBody.space !== "PATIENTS") {
    return NextResponse.json({ error: "Espace invalide" }, { status: 400 });
  }

  const rateLimit = await checkRateLimit(userId, "post", { maxRequests: 5, windowMinutes: 15 });
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: RATE_LIMIT_ERROR }, { status: 429 });
  }

  const parsed = createPostSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const { space, categoryId, title, body, locale } = parsed.data;

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category || category.space !== space) {
    return NextResponse.json({ error: "Catégorie invalide" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      space,
      categoryId,
      authorId: userId,
      title,
      body,
      originalLocale: locale,
      isAnswered: false,
    },
  });

  return NextResponse.json({ id: post.id }, { status: 201 });
}
