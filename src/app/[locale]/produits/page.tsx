import { useLocale, useTranslations } from "next-intl";
import { pathologies, products, ProductCategory } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const categories: { key: ProductCategory; anchor: string }[] = [
  { key: "health", anchor: "ligne-sante" },
  { key: "cosmetics", anchor: "cosmetiques" },
];

const categoryBadgeClasses: Record<ProductCategory, string> = {
  pharma: "bg-forest/10 text-forest",
  health: "bg-gold/10 text-gold",
  cosmetics: "bg-forest-light/10 text-forest-light",
};

export default function ProductsPage() {
  const t = useTranslations("products");
  const locale = useLocale();

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-paper px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Produits
            </span>
            <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-ink/80">{t("intro")}</p>
          </div>
        </section>

        <section id="medicaments" className="bg-paper px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <span className="font-mono text-xs uppercase tracking-widest text-gold">
              {t("pharma_title")}
            </span>
            <h2 className="mt-1 font-display text-2xl font-medium text-forest">
              {t("pharma_title")}
            </h2>
            <p className="mt-2 max-w-2xl text-ink/80">{t("pharma_text")}</p>

            <nav aria-label={t("browse_by_pathology")} className="mt-8">
              <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
                {t("browse_by_pathology")}
              </span>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pathologies.map((pathology) => (
                  <li key={pathology.slug}>
                    <a
                      href={`#${pathology.slug}`}
                      className="inline-block rounded-full border border-forest/20 bg-white px-3 py-1.5 text-xs font-medium text-forest transition hover:bg-forest hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {locale === "fr" ? pathology.nameFr : pathology.nameEn}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {pathologies.map((pathology) => (
              <div key={pathology.slug} id={pathology.slug} className="mt-12 scroll-mt-24">
                <h3 className="font-display text-xl font-medium text-forest">
                  {locale === "fr" ? pathology.nameFr : pathology.nameEn}
                </h3>
                <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {pathology.medicines.map((medicine) => (
                    <li
                      key={medicine.name}
                      className="rounded-lg border border-forest/10 bg-white p-6 transition hover:shadow-sm"
                    >
                      <strong className="block font-display text-base font-medium text-forest">
                        {medicine.name}
                      </strong>
                      {medicine.dosages.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {medicine.dosages.map((dosage) => (
                            <span
                              key={dosage}
                              className="rounded-full bg-forest/10 px-2.5 py-1 font-mono text-xs text-forest"
                            >
                              {dosage}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {categories.map(({ key, anchor }, i) => (
          <section
            key={key}
            id={anchor}
            className={i % 2 === 0 ? "bg-paper-warm px-6 py-14" : "bg-paper px-6 py-14"}
          >
            <div className="mx-auto max-w-6xl">
              <span className="font-mono text-xs uppercase tracking-widest text-gold">
                {t(`${key}_title` as any)}
              </span>
              <h2 className="mt-1 font-display text-2xl font-medium text-forest">
                {t(`${key}_title` as any)}
              </h2>
              <p className="mt-2 max-w-2xl text-ink/80">{t(`${key}_text` as any)}</p>

              <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {products
                  .filter((p) => p.category === key)
                  .map((product) => (
                    <li
                      key={product.slug}
                      className="rounded-lg border border-forest/10 bg-white p-6 transition hover:shadow-sm"
                    >
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${categoryBadgeClasses[product.category]}`}
                      >
                        {t(`${product.category}_title` as any)}
                      </span>
                      <strong className="mt-2 block font-display text-base font-medium text-forest">
                        {product.name}
                      </strong>
                      <p className="mt-2 text-sm text-ink/80">
                        {locale === "fr" ? product.descriptionFr : product.descriptionEn}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
