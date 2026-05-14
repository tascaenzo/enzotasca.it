"use client";

import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { Link } from "@/i18n/routing";
import { openCookiePreferences } from "@/lib/cookies/consent";

const links = [
  { href: "#youtube", label: "YouTube" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://github.com", label: "GitHub" },
  { href: "#articoli", label: "Blog" },
];

const socialLinkClassName =
  "text-ds-muted-strong transition-colors hover:text-ds-ink focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ds-blue";

const legalLinkClassName = "normal-case tracking-normal text-body-md";

export function SiteFooter() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const legalLinks = [
    { href: "/newsletter/cancellazione", label: tFooter("cancelNewsletter") },
    { href: "/cookie-policy", label: tFooter("cookiePolicy") },
    {
      href: "/preferenze-cookie",
      label: tFooter("cookiePreferences"),
      opensCookieBanner: true,
    },
  ];

  return (
    <footer className="bg-ds-paper py-20 text-ds-ink">
      <Container className="flex flex-col gap-10 text-caption uppercase tracking-caption">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="text-body-sm normal-case tracking-normal text-ds-zinc-900">
            Enzo Tasca
          </p>
          <nav aria-label={t("socialLabel")}>
            <ul className="flex flex-wrap gap-8">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    className={socialLinkClassName}
                    href={link.href}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-ds-border-soft pt-8 md:flex-row md:items-end md:justify-between">
          <p className="text-ds-muted-strong">&copy; {tFooter("copyright")}</p>
          <div className="flex flex-col items-end gap-4">
            <nav aria-label={t("legalLabel")}>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <TextLink
                      className={legalLinkClassName}
                      href={link.href}
                      onClick={(event) => {
                        if (!link.opensCookieBanner) {
                          return;
                        }

                        event.preventDefault();
                        openCookiePreferences();
                      }}
                    >
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
            <LocaleSwitcher />
          </div>
        </div>
      </Container>
    </footer>
  );
}
