import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { TranslateButton } from "@/components/TranslateButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-3xl font-medium text-forest md:text-4xl">
          {t("spacePatients")}
        </h1>
        <p className="mt-4 text-lg text-ink/80">{t("spacePatientsDesc")}</p>

        <ul className="mt-10 flex flex-col gap-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-ink/10 bg-white p-5"
            >
              <TranslateButton
                postId={post.id}
                targetLocale={targetLocale as "FR" | "EN"}
                originalText={post.body}
              />
              <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-gold">
                {post.isAnswered ? t("answered") : t("pending")}
              </span>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
