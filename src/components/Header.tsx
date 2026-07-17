"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const PRODUCT_CATEGORIES = [
  { key: "pharma_title", anchor: "medicaments" },
  { key: "health_title", anchor: "ligne-sante" },
  { key: "cosmetics_title", anchor: "cosmetiques" },
] as const;

const NAV_ITEMS = [
  { href: "/forum", key: "forum" },
  { href: "/a-propos", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

const linkClass =
  "group relative text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export function Header() {
  const nav = useTranslations("nav");
  const tp = useTranslations("products");
  const scrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-ink/10 transition-colors duration-300 ${
        scrolled ? "bg-paper/80 backdrop-blur-sm" : "bg-paper/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Logo variant="default" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              className={`${linkClass} flex items-center gap-1`}
              onClick={() => setProductsOpen((v) => !v)}
              aria-expanded={productsOpen}
              aria-haspopup="true"
            >
              {nav("products")}
              <svg viewBox="0 0 12 8" className="h-2 w-3 fill-current" aria-hidden="true">
                <path d="M0 0l6 8 6-8z" />
              </svg>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>

            <div
              className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                productsOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <ul className="flex min-w-[220px] flex-col gap-1 rounded-lg border border-ink/10 bg-white p-2 shadow-lg">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <li key={cat.anchor}>
                    <Link
                      href={`/produits#${cat.anchor}`}
                      className="block rounded-md px-3 py-2 text-sm text-ink transition hover:bg-paper-warm hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      onClick={() => setProductsOpen(false)}
                    >
                      {tp(cat.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {nav(item.key)}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-6 bg-current transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-6 bg-current transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-1 overflow-y-auto bg-paper px-6 py-8 transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-gold">
          {nav("products")}
        </span>
        <ul className="mb-4 mt-2 flex flex-col gap-1">
          {PRODUCT_CATEGORIES.map((cat) => (
            <li key={cat.anchor}>
              <Link
                href={`/produits#${cat.anchor}`}
                className="block rounded-md px-2 py-3 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                onClick={() => setMobileOpen(false)}
              >
                {tp(cat.key)}
              </Link>
            </li>
          ))}
        </ul>

        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-2 py-3 text-base font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            onClick={() => setMobileOpen(false)}
          >
            {nav(item.key)}
          </Link>
        ))}
      </div>
    </header>
  );
}
