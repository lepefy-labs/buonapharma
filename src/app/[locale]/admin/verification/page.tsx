import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

// Coda di verifica: un ADMIN esamina numero d'albo + documento caricato
// da ogni PHARMACIST_PENDING e lo promuove manualmente a PHARMACIST_VERIFIED.
// (l'azione di approvazione va collegata a una server action / API route dedicata)
export default async function VerificationQueue() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (!session || role !== "ADMIN") {
    redirect("/auth/sign-in?callbackUrl=/admin/verification");
  }

  const t = await getTranslations("admin");

  const pending = await prisma.user.findMany({
    where: { role: "PHARMACIST_PENDING" },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main id="main-content">
      <h1>{t("verificationQueue")}</h1>
      <ul>
        {pending.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email} — {t("licenseNumber")}: {u.licenseNumber ?? "—"}
            <button>{t("approve")}</button>
            <button>{t("reject")}</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
