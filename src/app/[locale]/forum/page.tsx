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
      <main>
        <section className="bg-paper px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Forum
            </span>
            <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
              {t("spacePharmacists")} & {t("spacePatients")}
            </h1>
          </div>
        </section>

        <section className="bg-paper px-6 py-14">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <Link
              href="/forum/pharmaciens"
              className="rounded-lg border border-forest/10 bg-white p-8 transition hover:border-gold hover:shadow-sm"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-gold">
                {t("spacePharmacists")}
              </span>
              <h2 className="mt-2 font-display text-xl font-medium text-forest">
                {t("spacePharmacists")}
              </h2>
              <p className="mt-2 text-sm text-ink/80">{t("spacePharmacistsDesc")}</p>
            </Link>
            <Link
              href="/forum/patients"
              className="rounded-lg border border-forest/10 bg-white p-8 transition hover:border-gold hover:shadow-sm"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-gold">
                {t("spacePatients")}
              </span>
              <h2 className="mt-2 font-display text-xl font-medium text-forest">
                {t("spacePatients")}
              </h2>
              <p className="mt-2 text-sm text-ink/80">{t("spacePatientsDesc")}</p>
            </Link>
          </div>

          <div className="mx-auto mt-8 max-w-5xl rounded-lg bg-paper-warm p-4">
            <p className="text-xs text-ink/60">{d("disclaimer")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
