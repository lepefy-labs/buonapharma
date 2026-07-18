import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Le nom est requis"),
    email: z.string().trim().email("Email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    role: z.enum(["PATIENT", "PHARMACIST"]),
    licenseNumber: z.string().trim().optional(),
  })
  .refine(
    (data) => data.role !== "PHARMACIST" || !!data.licenseNumber?.length,
    {
      message: "Le numéro d'inscription à l'Ordre est requis pour les pharmaciens",
      path: ["licenseNumber"],
    }
  );

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const { name, email, password, role, licenseNumber } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: role === "PHARMACIST" ? "PHARMACIST_PENDING" : "PATIENT",
      licenseNumber: role === "PHARMACIST" ? licenseNumber : undefined,
    },
  });

  return NextResponse.json(
    { id: user.id, email: user.email, role: user.role },
    { status: 201 }
  );
}
