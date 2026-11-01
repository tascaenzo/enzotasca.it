import { PageHeader } from "@enzotasca/ui";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/navigation/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cookie");
  return {
    title: t("cookiePolicyTitle"),
    description: t("cookiePolicyDescription"),
    alternates: {
      canonical: "/cookie-policy",
    },
  };
}

export default async function CookiePolicyPage() {
  const t = await getTranslations("cookie");

  return (
    <main id="main-content" className="bg-ds-white">
      <PageHeader
        eyebrow={t("cookiePolicyTitle")}
        title={`${t("cookiePolicyTitle")}.`}
      >
        <div className="mt-8 space-y-6 text-body-lg text-ds-warm-muted">
          <p>{t("cookiePolicyText1")}</p>
          <p>{t("cookiePolicyText2")}</p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/preferenze-cookie" variant="accent">
            {t("managePreferences")}
          </Button>
          <Button href="/" variant="outline">
            {t("backHome")}
          </Button>
        </div>
      </PageHeader>
    </main>
  );
}
