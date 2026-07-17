import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { TranslateButton } from "@/components/TranslateButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

// Spazio pubblico: chiunque può leggere e porre domande.
// A livello di API (non mostrato qui), la creazione di un Comment con
// isFromPharmacist=true è consentita solo se session.user.role === PHARMACIST_VERIFIED.
export default async function PatientsSpace({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("forum");
  const d = await getTranslations();
  const targetLocale = locale === "fr" ? "EN" : "FR";

  const posts = await prisma.post.findMany({
    where: { space: "PATIENTS" },
    include: { author: true, comments: { include: { author: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-paper px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Forum
            </span>
            <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
              {t("spacePatients")}
            </h1>
            <p className="mt-4 text-lg text-ink/80">{t("spacePatientsDesc")}</p>
          </div>
        </section>

        <section className="bg-paper-warm px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <ul className="flex flex-col gap-4">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="rounded-lg border border-forest/10 bg-white p-6 transition hover:shadow-sm"
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

            <div className="mt-8 rounded-lg bg-paper p-4">
              <p className="text-xs text-ink/60">{d("disclaimer")}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
