import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <Image src="/logo-white.png" alt="BuonaPharma" width={130} height={48} className="h-10 w-auto" />
          <p className="max-w-xs text-sm text-paper/80">{t("tagline")}</p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-paper/80">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            {t("address")}
          </span>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-4">
        <p className="mx-auto max-w-6xl text-xs text-paper/60">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
