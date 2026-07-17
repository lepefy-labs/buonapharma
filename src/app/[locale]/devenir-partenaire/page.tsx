import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PartnersPage() {
  const t = useTranslations("partners");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-medium text-forest md:text-4xl">
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
      </main>
      <Footer />
    </>
  );
}
