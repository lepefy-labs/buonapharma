import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const nav = useTranslations("nav");
  const t = useTranslations("home");
  const tp = useTranslations("products");

  const pillars = [
    { title: t("pillar1_title"), text: t("pillar1_text") },
    { title: t("pillar2_title"), text: t("pillar2_text") },
    { title: t("pillar3_title"), text: t("pillar3_text") },
  ];

  const productTeasers = [
    { tag: "01", title: tp("pharma_title"), text: tp("pharma_text") },
    { tag: "02", title: tp("health_title"), text: tp("health_text") },
    { tag: "03", title: tp("cosmetics_title"), text: tp("cosmetics_text") },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="dot-texture pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              {nav("home")} — BuonaPharma
            </span>
            <h1 className="font-display text-[clamp(2.3rem,4vw,3.4rem)] font-medium leading-tight text-forest">
              {t("hero_title")}
            </h1>
            <p className="max-w-2xl text-lg text-ink/80">{t("hero_subtitle")}</p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/produits"
                className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition hover:bg-forest-light"
              >
                {t("cta_products")}
              </Link>
              <Link
                href="/forum"
                className="rounded-full border border-forest px-6 py-3 text-sm font-medium text-forest transition hover:bg-forest hover:text-paper"
              >
                {t("cta_forum")}
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-paper-warm px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.title} className="border-l-2 border-gold pl-5">
                <h2 className="font-display text-xl font-medium text-forest">{p.title}</h2>
                <p className="mt-2 text-sm text-ink/80">{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {productTeasers.map((p) => (
              <article key={p.tag} className="rounded-lg border border-ink/10 bg-white p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-gold">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium text-forest">{p.title}</h3>
                <p className="mt-2 text-sm text-ink/80">{p.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
