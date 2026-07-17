import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PartnersPage() {
  const t = useTranslations("partners");

  return (
    <>
      <Header />
      <main className="bg-paper px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Devenir partenaire
          </span>
          <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-ink/80">{t("text")}</p>
          <p className="mt-4 text-ink/80">{t("cta_text")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition hover:bg-forest-light"
          >
            {t("cta_button")}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
