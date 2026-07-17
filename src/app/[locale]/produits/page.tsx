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
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="font-display text-3xl font-medium text-forest md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/80">{t("intro")}</p>

        {categories.map(({ key, anchor }) => (
          <section key={key} id={anchor} className="mt-14">
            <span className="font-mono text-xs uppercase tracking-widest text-gold">
              {t(`${key}_title` as any)}
            </span>
            <h2 className="mt-1 font-display text-2xl font-medium text-forest">
              {t(`${key}_title` as any)}
            </h2>
            <p className="mt-2 max-w-2xl text-ink/80">{t(`${key}_text` as any)}</p>

            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {products
                .filter((p) => p.category === key)
                .map((product) => (
                  <li
                    key={product.slug}
                    className="rounded-lg border border-ink/10 bg-white p-5"
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
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
