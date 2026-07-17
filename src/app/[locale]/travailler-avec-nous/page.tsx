import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CareersPage() {
  const t = useTranslations("careers");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-medium text-forest md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-ink/80">{t("text")}</p>
        <ul className="mt-6 space-y-2 text-ink/80">
          <li className="border-l-2 border-gold pl-4">{t("list_item1")}</li>
          <li className="border-l-2 border-gold pl-4">{t("list_item2")}</li>
          <li className="border-l-2 border-gold pl-4">{t("list_item3")}</li>
        </ul>
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
