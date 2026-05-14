import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return {
    title: t("newsletter"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NewsletterUnsubscribePage() {
  const t = await getTranslations("footer");

  return (
    <main id="main-content" className="bg-ds-white">
      <PageHeader eyebrow={t("cancelNewsletter")} title={t("cancelNewsletter") + "."}>
        <Button className="mt-10" href="/" variant="outline">
          {t("backHome")}
        </Button>
      </PageHeader>
    </main>
  );
}
