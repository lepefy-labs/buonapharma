import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "./config";

// Crea la navigazione con i path localizzati
export const { Link, useRouter, usePathname, redirect } = createLocalizedPathnamesNavigation({
  locales,
});
