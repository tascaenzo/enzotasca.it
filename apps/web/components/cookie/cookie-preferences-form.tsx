"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/checkbox-field";
import {
  type CookieConsent,
  clearCookieConsent,
  createCookieConsent,
  getCookieConsentServerSnapshot,
  getCookieConsentSnapshot,
  readCookieConsent,
  subscribeCookieConsent,
  writeCookieConsent,
} from "@/lib/cookies/consent";

type DraftPreferences = {
  analytics: boolean;
  marketing: boolean;
};

export function CookiePreferencesForm() {
  const t = useTranslations("cookie");
  const consentSnapshot = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot,
  );
  const consent = useMemo<CookieConsent | null>(() => {
    if (!consentSnapshot || consentSnapshot === "server") {
      return null;
    }

    return readCookieConsent();
  }, [consentSnapshot]);
  const [draft, setDraft] = useState<DraftPreferences | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const analytics = draft?.analytics ?? consent?.analytics ?? false;
  const marketing = draft?.marketing ?? consent?.marketing ?? false;
  const currentStatus =
    status ??
    (consent
      ? t("statusSavedOn", {
          date: new Date(consent.savedAt).toLocaleDateString(),
        })
      : t("statusNone"));

  const save = () => {
    writeCookieConsent(createCookieConsent({ analytics, marketing }));
    setDraft(null);
    setStatus(t("statusSaved"));
  };

  const revoke = () => {
    if (!window.confirm(t("revokeConfirm"))) {
      return;
    }

    clearCookieConsent();
    setDraft({ analytics: false, marketing: false });
    setStatus(t("statusRevoked"));
  };

  const updateDraft = (preferences: Partial<DraftPreferences>) => {
    setDraft((currentDraft) => ({
      analytics,
      marketing,
      ...currentDraft,
      ...preferences,
    }));
    setStatus(null);
  };

  return (
    <section
      aria-labelledby="cookie-settings-heading"
      className="mt-10 rounded-ds-lg bg-ds-surface p-6 md:p-8"
    >
      <h2 className="text-title-md text-ds-ink" id="cookie-settings-heading">
        {t("preferencesFormTitle")}
      </h2>

      <div className="mt-8 grid gap-5">
        <CheckboxField
          checked
          description={t("necessaryDescription")}
          disabled
          label={t("necessary")}
          name="necessaryCookies"
        />

        <CheckboxField
          checked={analytics}
          description={t("analyticsDescription")}
          label={t("analytics")}
          name="analyticsCookies"
          onChange={(event) =>
            updateDraft({ analytics: event.target.checked })
          }
        />

        <CheckboxField
          checked={marketing}
          description={t("marketingDescription")}
          label={t("marketing")}
          name="marketingCookies"
          onChange={(event) =>
            updateDraft({ marketing: event.target.checked })
          }
        />
      </div>

      <p
        aria-live="polite"
        className="mt-6 text-body-sm text-ds-warm-muted"
      >
        {currentStatus}
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button onClick={save} variant="accent">
          {t("savePreferences")}
        </Button>
        <Button onClick={revoke} variant="outline">
          {t("revokeConsent")}
        </Button>
      </div>
    </section>
  );
}
