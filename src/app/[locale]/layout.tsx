import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import "./globals.css";

export const metadata = {
  title: "BuonaPharma",
  description: "Laboratoire pharmaceutique — Yaoundé, Cameroun",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Alcune pagine (admin/verification, forum/pharmaciens) leggono headers/cookie
// lato server: il rendering statico non è compatibile, si passa a dynamic.
export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
