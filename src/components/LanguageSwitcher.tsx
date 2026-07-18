"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/config";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-forest/10 bg-white p-1 font-mono text-xs ${className}`}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            disabled={active}
            aria-current={active ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale: l })}
            className={`rounded-full px-3 py-1 uppercase transition ${
              active
                ? "bg-forest text-paper"
                : "text-forest hover:bg-forest/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
