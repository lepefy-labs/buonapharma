import { useLocale, useTranslations } from "next-intl";
import { products, ProductCategory } from "@/lib/products";

const categories: { key: ProductCategory; anchor: string }[] = [
  { key: "pharma", anchor: "medicaments" },
  { key: "health", anchor: "ligne-sante" },
  { key: "cosmetics", anchor: "cosmetiques" },
];

export default function ProductsPage() {
  const t = useTranslations("products");
  const locale = useLocale();

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("intro")}</p>

      {categories.map(({ key, anchor }) => (
        <section key={key} id={anchor}>
          <h2>{t(`${key}_title` as any)}</h2>
          <p>{t(`${key}_text` as any)}</p>

          <ul>
            {products
              .filter((p) => p.category === key)
              .map((product) => (
                <li key={product.slug}>
                  <strong>{product.name}</strong>
                  <p>{locale === "fr" ? product.descriptionFr : product.descriptionEn}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
