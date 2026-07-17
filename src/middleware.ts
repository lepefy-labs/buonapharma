import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // /fr/... e /en/... sempre espliciti
});

export const config = {
  // Esclude API, file statici e _next
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
