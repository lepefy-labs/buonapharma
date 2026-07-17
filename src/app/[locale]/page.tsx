import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function HomePage() {
  const nav = useTranslations("nav");
  const t = useTranslations("home");

  const pillars = [
    { title: t("pillar1_title"), text: t("pillar1_text") },
    { title: t("pillar2_title"), text: t("pillar2_text") },
    { title: t("pillar3_title"), text: t("pillar3_text") },
  ];

  return (
    <main>
      <nav>
        <Image src="/logo.png" alt="BuonaPharma" width={130} height={82} priority />
        <Link href="/produits">{nav("products")}</Link>
        <Link href="/a-propos">{nav("about")}</Link>
        <Link href="/forum">{nav("forum")}</Link>
        <Link href="/devenir-partenaire">{nav("partners")}</Link>
        <Link href="/travailler-avec-nous">{nav("careers")}</Link>
        <Link href="/contact">{nav("contact")}</Link>
      </nav>

      <section>
        <h1>{t("hero_title")}</h1>
        <p>{t("hero_subtitle")}</p>
        <Link href="/produits">{t("cta_products")}</Link>
        <Link href="/forum">{t("cta_forum")}</Link>
      </section>

      <section>
        {pillars.map((p) => (
          <article key={p.title}>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

