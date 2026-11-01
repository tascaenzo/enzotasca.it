import { Container } from "@enzotasca/ui";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("errors");

  return (
    <main
      id="main-content"
      className="grid min-h-[80dvh] place-items-center bg-ds-white"
    >
      <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-32">
        <span
          aria-hidden="true"
          className="grid h-14 w-14 place-items-center rounded-ds-xl bg-ds-ink font-mono text-title-md text-ds-white animate-pulse"
        >
          ET
        </span>
        <p className="font-mono text-mono-sm uppercase text-ds-muted-strong">
          {t("loading")}
        </p>
      </Container>
    </main>
  );
}
