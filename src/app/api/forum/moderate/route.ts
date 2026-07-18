import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const moderateSchema = z.object({
  type: z.enum(["post", "comment"]),
  id: z.string().min(1),
});

// DELETE /api/forum/moderate
// Réservé aux ADMIN : suppression d'un post (et de tout son contenu lié) ou d'un commentaire.
export async function DELETE(req: NextRequest) {
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (!session || role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const rawBody = await req.json().catch(() => null);
  const parsed = moderateSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const { type, id } = parsed.data;

  if (type === "post") {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "Sujet non trouvé" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.translation.deleteMany({ where: { comment: { postId: id } } }),
      prisma.translation.deleteMany({ where: { postId: id } }),
      prisma.comment.deleteMany({ where: { postId: id } }),
      prisma.post.delete({ where: { id } }),
    ]);
  } else {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      return NextResponse.json({ error: "Commentaire non trouvé" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.translation.deleteMany({ where: { commentId: id } }),
      prisma.comment.delete({ where: { id } }),
    ]);
  }

  return NextResponse.json({ deleted: true });
}
