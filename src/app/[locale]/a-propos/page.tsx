import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  const t = useTranslations("about");

  const blocks = [
    { mark: "🎯", eyebrow: t("mission_title"), title: t("mission_title"), text: t("mission_text") },
    { mark: "✓", eyebrow: t("quality_title"), title: t("quality_title"), text: t("quality_text") },
    { mark: "👥", eyebrow: t("team_title"), title: t("team_title"), text: t("team_text") },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-paper px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              À propos
            </span>
            <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-ink/80">{t("intro")}</p>
          </div>
        </section>

        {blocks.map((b, i) => (
          <section
            key={b.title}
            className={i % 2 === 0 ? "bg-paper-warm px-6 py-14" : "bg-paper px-6 py-14"}
          >
            <div className="mx-auto flex max-w-3xl gap-5">
              <span className="text-3xl leading-none" aria-hidden="true">
                {b.mark}
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-gold">
                  {b.eyebrow}
                </span>
                <h2 className="mt-1 font-display text-xl font-medium text-forest">{b.title}</h2>
                <p className="mt-2 text-ink/80">{b.text}</p>
              </div>
              {/* TODO: sostituire con foto/nomi reali del team quando disponibili */}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
