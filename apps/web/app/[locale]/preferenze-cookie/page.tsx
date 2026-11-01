import { PageHeader } from "@enzotasca/ui";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CookiePreferencesForm } from "@/components/cookie/cookie-preferences-form";
import { Button } from "@/components/navigation/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cookie");
  return {
    title: t("preferencesPageTitle"),
    description: t("preferencesPageDescription"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CookiePreferencesPage() {
  const t = await getTranslations("cookie");

  return (
    <main id="main-content" className="bg-ds-white">
      <PageHeader
        eyebrow={t("preferencesPageTitle")}
        title={`${t("preferencesPageTitle")}.`}
      >
        <p className="mt-6 text-body-lg text-ds-warm-muted">
          {t("preferencesPageDescription")}
        </p>
        <CookiePreferencesForm />
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/cookie-policy" variant="outline">
            {t("readPolicy")}
          </Button>
          <Button href="/" variant="outline">
            {t("backHome")}
          </Button>
        </div>
      </PageHeader>
    </main>
  );
}
