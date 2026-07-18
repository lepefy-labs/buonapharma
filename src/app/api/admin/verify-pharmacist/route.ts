import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const verifySchema = z.object({
  userId: z.string().min(1),
  action: z.enum(["approve", "reject"]),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  const adminId = (session?.user as any)?.id;

  if (!session || role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const parsed = verifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const { userId, action } = parsed.data;

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  const user =
    action === "approve"
      ? await prisma.user.update({
          where: { id: userId },
          data: {
            role: "PHARMACIST_VERIFIED",
            verifiedAt: new Date(),
            verifiedById: adminId,
          },
        })
      : await prisma.user.update({
          where: { id: userId },
          data: { role: "PATIENT" },
        });

  return NextResponse.json({ id: user.id, role: user.role });
}
