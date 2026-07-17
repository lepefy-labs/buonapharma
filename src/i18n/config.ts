export const locales = ["fr", "en"] as const;
export type AppLocale = (typeof locales)[number];

// Francese lingua di default (mercato locale, Camerun)
export const defaultLocale: AppLocale = "fr";
