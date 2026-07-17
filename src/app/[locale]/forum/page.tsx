import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ForumHub() {
  const t = useTranslations("forum");
  const d = useTranslations();

  return (
    <main>
      <section>
        <Link href="/forum/pharmaciens">
          <h2>{t("spacePharmacists")}</h2>
          <p>{t("spacePharmacistsDesc")}</p>
        </Link>
      </section>
      <section>
        <Link href="/forum/patients">
          <h2>{t("spacePatients")}</h2>
          <p>{t("spacePatientsDesc")}</p>
        </Link>
      </section>
      <p><small>{d("disclaimer")}</small></p>
    </main>
  );
}
