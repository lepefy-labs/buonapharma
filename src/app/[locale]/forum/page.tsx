import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ForumHub() {
  const t = useTranslations("forum");
  const d = useTranslations();
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-forest/10 bg-paper py-14 md:py-20">
        <div className="dot-texture pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="bp-shell relative max-w-4xl">
          <span className="bp-eyebrow">BuonaPharma Community</span>
          <h1 className="bp-title mt-3 text-4xl md:text-5xl">
            {isFr ? "Un espace de confiance pour mieux s’informer" : "A trusted space to get better informed"}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70 md:text-lg">
            {isFr
              ? "Patients et pharmaciens disposent de parcours distincts, avec une identification claire des professionnels vérifiés."
              : "Patients and pharmacists have separate spaces, with clear identification of verified professionals."}
          </p>
        </div>
      </section>

      <section className="bg-paper-warm py-14 md:py-20">
        <div className="bp-shell grid gap-6 md:grid-cols-2">
          <Link
            href="/forum/patients"
            className="bp-card group flex min-h-[360px] flex-col p-7 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-warm text-xl text-forest" aria-hidden="true">◌</span>
              <span className="rounded-full bg-paper-warm px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-forest">
                {isFr ? "Espace public" : "Public space"}
              </span>
            </div>
            <span className="bp-eyebrow mt-8">{t("spacePatients")}</span>
            <h2 className="mt-2 font-display text-3xl font-medium text-forest">
              {isFr ? "Posez votre question de santé" : "Ask your health question"}
            </h2>
            <p className="mt-4 text-sm leading-6 text-ink/70">{t("spacePatientsDesc")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs text-emerald-800">✓ {t("verifiedBadge")}</span>
              <span className="rounded-full bg-paper px-3 py-1.5 text-xs text-ink/60">FR / EN</span>
            </div>
            <span className="mt-auto pt-8 text-sm font-medium text-forest">{isFr ? "Voir les questions" : "View questions"} →</span>
          </Link>

          <Link
            href="/forum/pharmaciens"
            className="group flex min-h-[360px] flex-col rounded-2xl bg-forest p-7 text-paper shadow-xl shadow-forest/10 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/10 text-xl text-gold" aria-hidden="true">✓</span>
              <span className="rounded-full border border-paper/15 bg-paper/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-gold">
                {isFr ? "Accès vérifié" : "Verified access"}
              </span>
            </div>
            <span className="mt-8 font-mono text-[11px] uppercase tracking-[.18em] text-gold">{t("spacePharmacists")}</span>
            <h2 className="mt-2 font-display text-3xl font-medium text-paper">
              {isFr ? "Échanger entre professionnels" : "Discuss with fellow professionals"}
            </h2>
            <p className="mt-4 text-sm leading-6 text-paper/70">{t("spacePharmacistsDesc")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-paper/10 px-3 py-1.5 text-xs text-paper/80">✓ {t("verifiedBadge")}</span>
              <span className="rounded-full bg-paper/10 px-3 py-1.5 text-xs text-paper/80">{isFr ? "Espace privé" : "Private space"}</span>
            </div>
            <span className="mt-auto pt-8 text-sm font-medium text-paper">{isFr ? "Accéder à l’espace" : "Access the space"} →</span>
          </Link>
        </div>

        <div className="bp-shell mt-6">
          <div className="rounded-2xl border border-gold/20 bg-gold/10 p-4 md:p-5">
            <p className="text-xs leading-5 text-ink/65">{d("disclaimer")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
