import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ForumHub() {
  const t = useTranslations("forum");
  const d = useTranslations();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/forum/pharmaciens"
            className="rounded-lg border border-ink/10 bg-white p-6 transition hover:border-gold"
          >
            <h2 className="font-display text-xl font-medium text-forest">
              {t("spacePharmacists")}
            </h2>
            <p className="mt-2 text-sm text-ink/80">{t("spacePharmacistsDesc")}</p>
          </Link>
          <Link
            href="/forum/patients"
            className="rounded-lg border border-ink/10 bg-white p-6 transition hover:border-gold"
          >
            <h2 className="font-display text-xl font-medium text-forest">
              {t("spacePatients")}
            </h2>
            <p className="mt-2 text-sm text-ink/80">{t("spacePatientsDesc")}</p>
          </Link>
        </div>
        <p className="mt-8 text-xs text-ink/50">{d("disclaimer")}</p>
      </main>
      <Footer />
    </>
  );
}
