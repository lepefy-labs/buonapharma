import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { TranslateButton } from "@/components/TranslateButton";

// Spazio pubblico: chiunque può leggere e porre domande.
// A livello di API (non mostrato qui), la creazione di un Comment con
// isFromPharmacist=true è consentita solo se session.user.role === PHARMACIST_VERIFIED.
export default async function PatientsSpace({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("forum");
  const targetLocale = locale === "fr" ? "EN" : "FR";

  const posts = await prisma.post.findMany({
    where: { space: "PATIENTS" },
    include: { author: true, comments: { include: { author: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>{t("spacePatients")}</h1>
      <p>{t("spacePatientsDesc")}</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <TranslateButton
              postId={post.id}
              targetLocale={targetLocale as "FR" | "EN"}
              originalText={post.body}
            />
            <span>{post.isAnswered ? t("answered") : t("pending")}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
