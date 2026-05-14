"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { TextLink } from "@/components/ui/text-link";
import {
  COOKIE_CONSENT_EMPTY_SNAPSHOT,
  COOKIE_PREFERENCES_OPEN_EVENT,
  createCookieConsent,
  readCookieConsent,
  getCookieConsentServerSnapshot,
  getCookieConsentSnapshot,
  subscribeCookieConsent,
  writeCookieConsent,
} from "@/lib/cookies/consent";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [analytics, setAnalytics] = useState(false);
  const [isForcedOpen, setIsForcedOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const consentSnapshot = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot,
  );
  const isVisible =
    isForcedOpen || consentSnapshot === COOKIE_CONSENT_EMPTY_SNAPSHOT;

  useEffect(() => {
    if (!isVisible) {
      requestAnimationFrame(() => {
        const wrapper = document.getElementById("main-wrapper");
        if (wrapper && document.activeElement === document.body) {
          wrapper.focus();
        }
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const openPreferences = () => {
      const consent = readCookieConsent();

      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
      setIsPreferencesOpen(true);
      setIsForcedOpen(true);
    };

    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, openPreferences);

    return () => {
      window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, openPreferences);
    };
  }, []);

  const saveConsent = ({
    analytics,
    marketing,
  }: {
    analytics: boolean;
    marketing: boolean;
  }) => {
    writeCookieConsent(createCookieConsent({ analytics, marketing }));
    setIsForcedOpen(false);
    setIsPreferencesOpen(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ds-border-soft bg-ds-white p-4 shadow-2xl md:p-6"
    >
      <div className="mx-auto grid max-w-site gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
        <div className="max-w-4xl">
          <p
            className="font-mono text-mono-sm uppercase text-ds-blue"
            id="cookie-banner-title"
          >
            {t("bannerTitle")}
          </p>
          <p className="mt-3 text-body-md text-ds-warm-muted">
            {t("bannerDescription")}
          </p>
          <TextLink className="mt-4" href="/cookie-policy" tone="ink">
            {t("readPolicy")}
          </TextLink>

          {isPreferencesOpen ? (
            <div className="mt-4 flex max-w-2xl flex-wrap gap-x-5 gap-y-2">
              <CheckboxField
                checked
                className="bg-transparent p-0 hover:bg-transparent [&>span>span:first-child]:text-body-sm [&>span>span:last-child]:sr-only"
                description={t("necessaryDescription")}
                disabled
                label={t("necessary")}
                name="bannerNecessaryCookies"
              />
              <CheckboxField
                checked={analytics}
                className="bg-transparent p-0 hover:bg-transparent [&>span>span:first-child]:text-body-sm [&>span>span:last-child]:sr-only"
                description={t("analyticsDescription")}
                label={t("analytics")}
                name="bannerAnalyticsCookies"
                onChange={(event) => setAnalytics(event.target.checked)}
              />
              <CheckboxField
                checked={marketing}
                className="bg-transparent p-0 hover:bg-transparent [&>span>span:first-child]:text-body-sm [&>span>span:last-child]:sr-only"
                description={t("marketingDescription")}
                label={t("marketing")}
                name="bannerMarketingCookies"
                onChange={(event) => setMarketing(event.target.checked)}
              />
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-3">
          <Button
            onClick={() => saveConsent({ analytics: false, marketing: false })}
            size="md"
            className="h-11 px-2 text-body-sm md:px-5 md:text-body-md"
            variant="outline"
          >
            {t("reject")}
          </Button>
          <Button
            aria-expanded={isPreferencesOpen}
            aria-label={
              isPreferencesOpen
                ? t("save") + " " + t("preferences").toLowerCase()
                : t("preferences")
            }
            className="h-11 px-2 text-body-sm md:px-5 md:text-body-md"
            onClick={() => {
              if (isPreferencesOpen) {
                saveConsent({ analytics, marketing });
                return;
              }

              setIsPreferencesOpen(true);
            }}
            size="md"
            variant="secondary"
          >
            {isPreferencesOpen ? t("save") : t("preferences")}
          </Button>
          <Button
            onClick={() => saveConsent({ analytics: true, marketing: true })}
            size="md"
            className="h-11 px-2 text-body-sm md:px-5 md:text-body-md"
            variant="accent"
          >
            {t("accept")}
          </Button>
        </div>
      </div>
    </section>
  );
}
