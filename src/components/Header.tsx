"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";

const NAV_ITEMS = [
  { href: "/produits", key: "products" },
  { href: "/a-propos", key: "about" },
  { href: "/forum", key: "forum" },
  { href: "/devenir-partenaire", key: "partners" },
  { href: "/travailler-avec-nous", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const nav = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <Logo variant="default" />
        </Link>

        <nav className="flex flex-wrap items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-ink"
            >
              {nav(item.key)}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
