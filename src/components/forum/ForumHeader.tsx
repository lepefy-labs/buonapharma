"use client";

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

  const isVerified = user?.role === "PHARMACIST_VERIFIED" || user?.role === "ADMIN";
  const isPending = user?.role === "PHARMACIST_PENDING";

  return (
    <header className="border-b border-forest/15 bg-paper-warm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className={`${linkClass} flex items-center gap-1`}>
            ← {nav("home")}
          </Link>
          <span className="h-4 w-px bg-forest/20" aria-hidden="true" />
          <span className="font-display text-base font-medium text-forest">
            BuonaPharma Forum
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-ink/80">{user.name}</span>
              {isVerified && (
                <span className="rounded-full bg-forest/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-forest">
                  {tf("verifiedBadge")}
                </span>
              )}
              {isPending && (
                <span className="rounded-full bg-gold/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold">
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
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href={`/auth/sign-in?callbackUrl=${encodeURIComponent(pathname)}`}
                className={linkClass}
              >
                {ta("signIn")}
              </Link>
              <Link
                href={`/auth/sign-up?callbackUrl=${encodeURIComponent(pathname)}`}
                className="rounded-full bg-forest px-4 py-2 text-sm font-medium text-paper transition hover:bg-forest-light"
              >
                {ta("signUp")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
