import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { VerificationActions } from "@/components/VerificationActions";

export const dynamic = "force-dynamic";

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
    <main id="main-content" className="bg-paper px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-2xl font-medium text-forest md:text-3xl">
          {t("verificationQueue")}
        </h1>
        <ul className="mt-8 flex flex-col gap-4">
          {pending.map((u) => (
            <li
              key={u.id}
              className="flex flex-col gap-4 rounded-lg border border-forest/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 text-sm text-ink/80">
                <p className="font-medium text-ink">{u.name}</p>
                <p className="break-all">{u.email}</p>
                <p>
                  {t("licenseNumber")}: {u.licenseNumber ?? "—"}
                </p>
              </div>
              <VerificationActions userId={u.id} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
