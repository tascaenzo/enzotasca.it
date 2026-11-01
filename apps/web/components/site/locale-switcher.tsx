"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const locales = ["it", "en", "fr", "de", "es"] as const;

export function LocaleSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1.5">
      {locales.map((code) => (
        <li key={code}>
          {code === currentLocale ? (
            <span
              aria-current="page"
              className="inline-flex h-8 w-8 items-center justify-center rounded-ds-md bg-ds-ink font-mono text-mono-sm font-medium text-ds-white"
            >
              {code.toUpperCase()}
            </span>
          ) : (
            <Link
              aria-label={t("switchToLang", {
                lang: t(`lang${code.charAt(0).toUpperCase()}${code.slice(1)}`),
              })}
              className="inline-flex h-8 w-8 items-center justify-center rounded-ds-md font-mono text-mono-sm text-ds-muted-strong transition-colors hover:bg-ds-surface hover:text-ds-ink focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ds-blue"
              href={pathname}
              locale={code}
            >
              {code.toUpperCase()}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
