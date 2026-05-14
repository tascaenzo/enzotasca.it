"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="bg-ds-white">
      <Section className="pt-20 md:pt-32">
        <Container className="flex flex-col items-center text-center">
          <div className="flex max-w-2xl flex-col gap-4">
            <Eyebrow>{t("errorEyebrow")}</Eyebrow>
            <h1 className="text-headline-lg text-ds-ink md:text-display-md">
              {t("errorTitle")}
            </h1>
            <p className="text-body-lg text-ds-warm-muted">
              {t("errorDescription")}
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button onClick={reset} variant="accent">
              {t("retry")}
            </Button>
            <Button href="/" variant="outline">
              {t("backHome")}
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
