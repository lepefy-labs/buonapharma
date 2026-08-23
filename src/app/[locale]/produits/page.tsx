"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pathologies, products, ProductCategory } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const categories: { key: ProductCategory; anchor: string }[] = [
  { key: "health", anchor: "ligne-sante" },
  { key: "cosmetics", anchor: "cosmetiques" },
];

const categoryBadgeClasses: Record<ProductCategory, string> = {
  pharma: "bg-forest/10 text-forest",
  health: "bg-emerald-50 text-emerald-800",
  cosmetics: "bg-amber-50 text-amber-800",
};

export default function ProductsPage() {
  const t = useTranslations("products");
  const locale = useLocale();
  const isFr = locale === "fr";
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLocaleLowerCase(locale);

  const filteredPathologies = useMemo(() => {
    if (!normalizedQuery) return pathologies;
    return pathologies
      .map((pathology) => ({
        ...pathology,
        medicines: pathology.medicines.filter((medicine) =>
          `${medicine.name} ${medicine.dosages.join(" ")}`.toLocaleLowerCase(locale).includes(normalizedQuery),
        ),
      }))
      .filter((pathology) => {
        const name = locale === "fr" ? pathology.nameFr : pathology.nameEn;
        return name.toLocaleLowerCase(locale).includes(normalizedQuery) || pathology.medicines.length > 0;
      });
  }, [locale, normalizedQuery]);

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return products;
    return products.filter((product) => {
      const description = locale === "fr" ? product.descriptionFr : product.descriptionEn;
      return `${product.name} ${description}`.toLocaleLowerCase(locale).includes(normalizedQuery);
    });
  }, [locale, normalizedQuery]);

  const resultCount = filteredPathologies.reduce((sum, pathology) => sum + pathology.medicines.length, 0) + filteredProducts.length;

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-forest/10 bg-paper py-14 md:py-20">
          <div className="dot-texture pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
          <div className="bp-shell relative">
            <span className="bp-eyebrow">{isFr ? "Catalogue santé" : "Health catalogue"}</span>
            <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-end">
              <div>
                <h1 className="bp-title text-4xl md:text-5xl">{t("title")}</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70 md:text-lg">{t("intro")}</p>
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-3 shadow-sm">
                <label htmlFor="product-search" className="sr-only">
                  {isFr ? "Rechercher un produit ou une indication" : "Search a product or condition"}
                </label>
                <div className="flex items-center gap-3">
                  <span className="pl-2 text-forest" aria-hidden="true">⌕</span>
                  <input
                    id="product-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={isFr ? "Rechercher un produit, une indication…" : "Search a product, a condition…"}
                    className="min-h-11 w-full bg-transparent px-1 text-sm text-ink outline-none placeholder:text-ink/40"
                  />
                  {query ? (
                    <button type="button" onClick={() => setQuery("")} className="min-h-10 rounded-lg px-3 text-xs font-medium text-forest hover:bg-paper-warm">
                      {isFr ? "Effacer" : "Clear"}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <nav aria-label={isFr ? "Catégories de produits" : "Product categories"} className="mt-8 flex gap-2 overflow-x-auto pb-1">
              <a href="#medicaments" className="bp-chip whitespace-nowrap">{t("pharma_title")}</a>
              <a href="#ligne-sante" className="bp-chip whitespace-nowrap">{t("health_title")}</a>
              <a href="#cosmetiques" className="bp-chip whitespace-nowrap">{t("cosmetics_title")}</a>
            </nav>
          </div>
        </section>

        {query ? (
          <div className="border-b border-forest/10 bg-white">
            <div className="bp-shell py-3 text-xs text-ink/60">
              {resultCount} {isFr ? "résultats pour" : "results for"} <strong className="text-forest">“{query}”</strong>
            </div>
          </div>
        ) : null}

        <section id="medicaments" className="scroll-mt-24 bg-white py-16 md:py-20">
          <div className="bp-shell">
            <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <span className="bp-eyebrow">01 · {t("pharma_title")}</span>
                <h2 className="bp-title mt-2 text-3xl">{isFr ? "Par besoin de santé" : "By health need"}</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-ink/70">{t("pharma_text")}</p>
                {!query ? (
                  <nav aria-label={t("browse_by_pathology")} className="mt-7 flex flex-wrap gap-2">
                    {pathologies.map((pathology) => (
                      <a key={pathology.slug} href={`#${pathology.slug}`} className="bp-chip">
                        {locale === "fr" ? pathology.nameFr : pathology.nameEn}
                      </a>
                    ))}
                  </nav>
                ) : null}
              </div>

              <div className="space-y-8">
                {filteredPathologies.map((pathology) => (
                  <section key={pathology.slug} id={pathology.slug} className="scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-warm font-mono text-xs text-forest">+</span>
                      <h3 className="font-display text-2xl font-medium text-forest">{locale === "fr" ? pathology.nameFr : pathology.nameEn}</h3>
                    </div>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {pathology.medicines.map((medicine) => (
                        <li key={medicine.name} className="rounded-2xl border border-forest/10 bg-paper p-5">
                          <strong className="block font-display text-lg font-medium text-forest">{medicine.name}</strong>
                          {medicine.dosages.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {medicine.dosages.map((dosage) => (
                                <span key={dosage} className="rounded-full bg-white px-2.5 py-1 font-mono text-[11px] text-forest ring-1 ring-forest/10">{dosage}</span>
                              ))}
                            </div>
                          ) : null}
                          <p className="mt-4 text-[11px] leading-5 text-ink/50">
                            {isFr ? "Information indicative — demandez conseil à un professionnel de santé." : "Indicative information — ask a healthcare professional for advice."}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}

                {filteredPathologies.length === 0 ? (
                  <div className="rounded-2xl bg-paper-warm p-8 text-center text-sm text-ink/65">
                    {isFr ? "Aucun médicament ne correspond à cette recherche." : "No medicine matches this search."}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {categories.map(({ key, anchor }, index) => {
          const categoryProducts = filteredProducts.filter((product) => product.category === key);
          return (
            <section key={key} id={anchor} className={`scroll-mt-24 py-16 md:py-20 ${index % 2 === 0 ? "bg-paper-warm" : "bg-paper"}`}>
              <div className="bp-shell">
                <div className="max-w-2xl">
                  <span className="bp-eyebrow">0{index + 2} · {t(`${key}_title` as any)}</span>
                  <h2 className="bp-title mt-2 text-3xl md:text-4xl">{t(`${key}_title` as any)}</h2>
                  <p className="mt-3 text-base leading-7 text-ink/70">{t(`${key}_text` as any)}</p>
                </div>

                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProducts.map((product) => (
                    <li key={product.slug}>
                      <Link href={`/produits/${product.slug}`} className="bp-card group flex h-full min-h-64 flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                        <span className={`w-fit rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${categoryBadgeClasses[product.category]}`}>
                          {t(`${product.category}_title` as any)}
                        </span>
                        <h3 className="mt-5 font-display text-2xl font-medium text-forest">{product.name}</h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/65">{locale === "fr" ? product.descriptionFr : product.descriptionEn}</p>
                        <span className="mt-auto pt-6 text-sm font-medium text-forest">{isFr ? "Voir la fiche" : "View details"} →</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {categoryProducts.length === 0 ? (
                  <div className="mt-8 rounded-2xl bg-white/70 p-8 text-center text-sm text-ink/65">
                    {isFr ? "Aucun produit ne correspond à cette recherche." : "No product matches this search."}
                  </div>
                ) : null}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
