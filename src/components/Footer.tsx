import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";

const SITEMAP_LINKS = [
  { href: "/", key: "home" },
  { href: "/produits", key: "products" },
  { href: "/a-propos", key: "about" },
  { href: "/forum", key: "forum" },
  { href: "/contact", key: "contact" },
] as const;

const JOIN_US_LINKS = [
  { href: "/devenir-partenaire", key: "partners" },
  { href: "/travailler-avec-nous", key: "careers" },
] as const;

const CONTACT = {
  phone: "+39 059 472 1789",
  email: "info@buonapharma.com",
  niu: "M101812728012K",
};

const columnLinkClass =
  "text-sm text-paper/80 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export function Footer() {
  const nav = useTranslations("nav");
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-12 md:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <Logo variant="reversed" />
          <p className="max-w-xs text-sm text-paper/80">{t("tagline")}</p>
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            {t("address")}
          </span>
          <span className="font-mono text-xs text-paper/70">
            {t("niu")}: {CONTACT.niu}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
            {t("sitemap_title")}
          </h3>
          <ul className="flex flex-col gap-2">
            {SITEMAP_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={columnLinkClass}>
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
            {t("joinUs_title")}
          </h3>
          <ul className="flex flex-col gap-2">
            {JOIN_US_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={columnLinkClass}>
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
            {t("contact_title")}
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a href={`mailto:${CONTACT.email}`} className={columnLinkClass}>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className={columnLinkClass}>
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <Link href="/forum" className={columnLinkClass}>
                {nav("forum")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/60">{t("copyright", { year })}</p>
          <p className="font-mono text-xs text-paper/70 opacity-70">
            {t("poweredBy")}{" "}
            <a
              href="https://www.robertinboukeng.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Lepefy Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
