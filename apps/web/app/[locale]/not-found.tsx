import { Container, Section } from "@enzotasca/ui";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/navigation/button";

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <main id="main-content" className="bg-ds-white">
      <Section className="pt-20 md:pt-32">
        <Container className="flex flex-col items-center text-center">
          <div className="flex max-w-2xl flex-col items-center gap-4">
            <span
              aria-hidden="true"
              className="font-mono text-[160px] leading-none text-ds-blue md:text-[200px]"
            >
              404
            </span>
            <h1 className="text-headline-lg text-ds-ink md:text-display-md">
              {t("notFoundTitle")}
            </h1>
            <p className="text-body-lg text-ds-warm-muted">
              {t("notFoundDescription")}
            </p>
          </div>
          <Button className="mt-10" href="/" variant="accent">
            {t("backHome")}
          </Button>
        </Container>
      </Section>
    </main>
  );
}
