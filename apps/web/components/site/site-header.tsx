import { Container } from "@enzotasca/ui";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/navigation/button";
import { MobileMenu } from "@/components/site/mobile-menu";
import { Link } from "@/i18n/routing";

export async function SiteHeader() {
  const t = await getTranslations("nav");

  const navItems = [
    { href: "#profilo", label: t("profilo") },
    { href: "#progetti", label: t("progetti") },
    { href: "#articoli", label: t("articoli") },
    { href: "#youtube", label: t("youtube") },
  ];

  return (
    <header className="relative z-40 border-b border-ds-border-soft/70 bg-ds-white/95">
      <Container className="flex min-h-20 items-center justify-between">
        <Link
          aria-label={t("homeLink")}
          className="group flex w-fit items-center gap-3 text-ds-zinc-900 transition-colors hover:text-ds-blue focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ds-blue"
          href="/"
        >
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-ds-xl bg-ds-ink font-mono text-mono-sm text-ds-white transition-colors group-hover:bg-ds-blue"
          >
            ET
          </span>
          <span className="flex flex-col">
            <span className="text-body-md font-medium tracking-[-0.3px]">
              {t("siteTitle")}
            </span>
            <span className="font-mono text-mono-sm uppercase text-ds-muted-strong">
              {t("siteSubtitle")}
            </span>
          </span>
        </Link>

        <nav aria-label={t("navLabel")} className="hidden md:block">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Button
                  className="h-10 px-4 text-nav"
                  href={item.href}
                  size="md"
                  variant="ghost"
                >
                  {item.label}
                </Button>
              </li>
            ))}
            <li>
              <Button
                className="ml-1 h-10 rounded-ds-xl px-5"
                href="#newsletter"
                size="md"
                variant="outline"
              >
                {t("newsletter")}
              </Button>
            </li>
          </ul>
        </nav>

        <MobileMenu navItems={navItems} />
      </Container>
    </header>
  );
}
