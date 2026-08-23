"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const PRODUCT_CATEGORIES = [
  { key: "pharma_title", anchor: "medicaments" },
  { key: "health_title", anchor: "ligne-sante" },
  { key: "cosmetics_title", anchor: "cosmetiques" },
] as const;

const linkClass =
  "group relative text-sm font-medium text-ink transition hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export function Header() {
  const nav = useTranslations("nav");
  const tp = useTranslations("products");
  const locale = useLocale();
  const scrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const professionalLabel = locale === "fr" ? "Professionnels" : "Professionals";
  const askLabel = locale === "fr" ? "Poser une question" : "Ask a question";

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10">
      <div className={`transition-colors duration-300 ${scrolled ? "bg-paper/90 backdrop-blur-xl" : "bg-paper/95 backdrop-blur-md"}`}>
        <div className="bp-shell flex min-h-[72px] items-center justify-between gap-5">
          <Link href="/" className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
            <Logo variant="default" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className={`${linkClass} flex items-center gap-1.5`}
                onClick={() => setProductsOpen((value) => !value)}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                {nav("products")}
                <svg viewBox="0 0 12 8" className="h-2 w-3 fill-current" aria-hidden="true">
                  <path d="M0 0l6 8 6-8z" />
                </svg>
              </button>

              <div
                className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                  productsOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <ul className="min-w-[240px] rounded-2xl border border-forest/10 bg-white p-2 shadow-xl shadow-forest/10">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <li key={cat.anchor}>
                      <Link
                        href={`/produits#${cat.anchor}`}
                        className="block rounded-xl px-4 py-3 text-sm text-ink transition hover:bg-paper-warm hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        onClick={() => setProductsOpen(false)}
                      >
                        {tp(cat.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link href="/forum" className={linkClass}>{nav("forum")}</Link>
            <Link href="/forum/pharmaciens" className={linkClass}>{professionalLabel}</Link>
            <Link href="/a-propos" className={linkClass}>{nav("about")}</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Link href="/forum/patients/new" className="bp-button-primary hidden xl:inline-flex">
              {askLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="relative block h-4 w-6">
              <span className={`absolute left-0 top-0 block h-0.5 w-6 bg-current transition-transform ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] block h-0.5 w-6 bg-current transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 top-[14px] block h-0.5 w-6 bg-current transition-transform ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper px-5 pb-8 pt-24 transition-all duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Fermer le menu"
          tabIndex={mobileOpen ? 0 : -1}
          className="fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl text-forest shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <span aria-hidden="true">×</span>
        </button>

        <span className="bp-eyebrow">{nav("products")}</span>
        <ul className="mb-5 mt-2 flex flex-col">
          {PRODUCT_CATEGORIES.map((cat) => (
            <li key={cat.anchor} className="border-b border-forest/10">
              <Link
                href={`/produits#${cat.anchor}`}
                className="block py-4 font-display text-xl text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                onClick={() => setMobileOpen(false)}
              >
                {tp(cat.key)}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col">
          {[
            { href: "/forum", label: nav("forum") },
            { href: "/forum/pharmaciens", label: professionalLabel },
            { href: "/a-propos", label: nav("about") },
            { href: "/contact", label: nav("contact") },
          ].map((item) => (
            <li key={item.href} className="border-b border-forest/10">
              <Link
                href={item.href}
                className="block py-4 text-lg font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/forum/patients/new" className="bp-button-primary mt-8" onClick={() => setMobileOpen(false)}>
          {askLabel}<span aria-hidden="true">→</span>
        </Link>

        <div className="mt-8"><LanguageSwitcher /></div>
      </div>
    </header>
  );
}
