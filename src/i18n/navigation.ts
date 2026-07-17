import { createNavigation } from "next-intl/navigation";
import { locales } from "./config";

// Link, useRouter, usePathname, redirect: tutti locale-aware.
// Da usare al posto di next/link e next/navigation in tutte le pagine.
export const { Link, useRouter, usePathname, redirect } = createNavigation({
  locales,
});
