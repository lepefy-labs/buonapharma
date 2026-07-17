import { useLocale, useTranslations } from "next-intl";
import { products, ProductCategory } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const categories: { key: ProductCategory; anchor: string }[] = [
  { key: "pharma", anchor: "medicaments" },
  { key: "health", anchor: "ligne-sante" },
  { key: "cosmetics", anchor: "cosmetiques" },
];

export default function ProductsPage() {
  const t = useTranslations("products");
  const locale = useLocale();

  return (
    <>
      <Header />
      <main>
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
                      <strong className="font-display text-base font-medium text-forest">
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
