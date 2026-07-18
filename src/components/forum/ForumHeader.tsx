"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { Link, usePathname } from "@/i18n/navigation";

const linkClass =
  "group relative text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export function ForumHeader() {
  const nav = useTranslations("nav");
  const ta = useTranslations("auth");
  const tf = useTranslations("forum");
  const tadmin = useTranslations("admin");
  const { data: session } = useSession();
  const user = session?.user as { name?: string | null; role?: string } | undefined;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isVerified = user?.role === "PHARMACIST_VERIFIED" || user?.role === "ADMIN";
  const isPending = user?.role === "PHARMACIST_PENDING";
  const signInHref = `/auth/sign-in?callbackUrl=${encodeURIComponent(pathname)}`;
  const signUpHref = `/auth/sign-up?callbackUrl=${encodeURIComponent(pathname)}`;

  return (
    <header className="relative border-b border-forest/15 bg-paper-warm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`${linkClass} flex shrink-0 items-center gap-1 whitespace-nowrap text-xs sm:text-sm`}
          >
            <span aria-hidden="true">←</span> {nav("home")}
          </Link>
          <span className="hidden h-4 w-px bg-forest/20 sm:block" aria-hidden="true" />
          <span className="hidden truncate font-display text-base font-medium text-forest sm:inline">
            BuonaPharma Forum
          </span>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            {/* Desktop: full user info inline */}
            <div className="hidden items-center gap-3 text-sm md:flex">
              <span className="max-w-[10rem] truncate text-ink/80">{user.name}</span>
              {isVerified && (
                <span className="whitespace-nowrap rounded-full bg-forest/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-forest">
                  {tf("verifiedBadge")}
                </span>
              )}
              {isPending && (
                <span className="whitespace-nowrap rounded-full bg-gold/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold">
                  {tf("pendingBadge")}
                </span>
              )}
              {user.role === "ADMIN" && (
                <Link href="/admin/verification" className={linkClass}>
                  {tadmin("verificationQueue")}
                </Link>
              )}
              <button
                type="button"
                onClick={() => signOut()}
                className={`${linkClass} cursor-pointer`}
              >
                {ta("signOut")}
              </button>
            </div>

            {/* Mobile: collapsed toggle with abbreviated name */}
            <div className="relative md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-label={user.name ?? ta("signOut")}
                className="flex min-h-[44px] items-center gap-1 rounded-md px-2 text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span className="max-w-[6rem] truncate">{user.name}</span>
                <svg viewBox="0 0 12 8" className="h-2 w-3 shrink-0 fill-current" aria-hidden="true">
                  <path d="M0 0l6 8 6-8z" />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 flex min-w-[220px] flex-col gap-1 rounded-lg border border-forest/10 bg-white p-3 shadow-lg">
                  {isVerified && (
                    <span className="w-fit rounded-full bg-forest/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-forest">
                      {tf("verifiedBadge")}
                    </span>
                  )}
                  {isPending && (
                    <span className="w-fit rounded-full bg-gold/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold">
                      {tf("pendingBadge")}
                    </span>
                  )}
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/verification"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[44px] items-center text-sm font-medium text-ink"
                    >
                      {tadmin("verificationQueue")}
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="flex min-h-[44px] items-center text-left text-sm font-medium text-ink"
                  >
                    {ta("signOut")}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={signInHref}
              className="flex min-h-[44px] items-center text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {ta("signIn")}
            </Link>
            <Link
              href={signUpHref}
              className="hidden min-h-[44px] items-center rounded-full bg-forest px-4 py-2 text-sm font-medium text-paper transition hover:bg-forest-light sm:flex"
            >
              {ta("signUp")}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
