import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CareersPage() {
  const t = useTranslations("careers");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("text")}</p>
      <ul>
        <li>{t("list_item1")}</li>
        <li>{t("list_item2")}</li>
        <li>{t("list_item3")}</li>
      </ul>
      <Link href="/contact">{t("cta_button")}</Link>
    </main>
  );
}
