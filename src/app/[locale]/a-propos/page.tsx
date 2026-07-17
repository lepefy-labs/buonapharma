import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-3xl font-medium text-forest md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-ink/80">{t("intro")}</p>

        <section className="mt-10 border-l-2 border-gold pl-5">
          <h2 className="font-display text-xl font-medium text-forest">{t("mission_title")}</h2>
          <p className="mt-2 text-ink/80">{t("mission_text")}</p>
        </section>

        <section className="mt-8 border-l-2 border-gold pl-5">
          <h2 className="font-display text-xl font-medium text-forest">{t("quality_title")}</h2>
          <p className="mt-2 text-ink/80">{t("quality_text")}</p>
        </section>

        <section className="mt-8 border-l-2 border-gold pl-5">
          <h2 className="font-display text-xl font-medium text-forest">{t("team_title")}</h2>
          <p className="mt-2 text-ink/80">{t("team_text")}</p>
          {/* TODO: sostituire con foto/nomi reali del team quando disponibili */}
        </section>
      </main>
      <Footer />
    </>
  );
}
