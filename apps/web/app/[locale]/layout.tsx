import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { CookieBanner } from "@/components/cookie/cookie-banner";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://enzotasca.dev"),
  title: {
    default: "Enzo Tasca",
    template: "%s | Enzo Tasca",
  },
  description:
    "Sviluppatore web che racconta progetti di elettronica e informatica con articoli tecnici, video YouTube e casi studio.",
  keywords: [
    "Enzo Tasca",
    "sviluppatore web",
    "elettronica",
    "informatica",
    "Next.js",
    "YouTube",
    "blog tecnico",
  ],
  authors: [{ name: "Enzo Tasca" }],
  creator: "Enzo Tasca",
  publisher: "Enzo Tasca",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Enzo Tasca",
    description:
      "Sviluppatore web che racconta progetti di elettronica e informatica con articoli tecnici, video YouTube e casi studio.",
    siteName: "Enzo Tasca",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enzo Tasca",
    description:
      "Sviluppatore web che racconta progetti di elettronica e informatica con articoli tecnici, video YouTube e casi studio.",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-ds-md focus:bg-ds-ink focus:px-4 focus:py-2 focus:text-ds-white"
            href="#main-content"
          >
            Vai al contenuto principale
          </a>
          <SiteHeader />
          <div
            className="flex-1"
            id="main-wrapper"
            tabIndex={-1}
            style={{ outline: "none" }}
          >
            {children}
          </div>
          <SiteFooter />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
