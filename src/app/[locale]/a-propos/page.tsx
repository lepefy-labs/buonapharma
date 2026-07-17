import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("intro")}</p>

      <section>
        <h2>{t("mission_title")}</h2>
        <p>{t("mission_text")}</p>
      </section>

      <section>
        <h2>{t("quality_title")}</h2>
        <p>{t("quality_text")}</p>
      </section>

      <section>
        <h2>{t("team_title")}</h2>
        <p>{t("team_text")}</p>
        {/* TODO: sostituire con foto/nomi reali del team quando disponibili */}
      </section>
    </main>
  );
}
