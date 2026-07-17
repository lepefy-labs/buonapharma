import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PartnersPage() {
  const t = useTranslations("partners");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("text")}</p>
      <p>{t("cta_text")}</p>
      <Link href="/contact">{t("cta_button")}</Link>
    </main>
  );
}
