export type CookieConsent = {
  analytics: boolean;
  marketing: boolean;
  necessary: true;
  savedAt: string;
};

export const COOKIE_CONSENT_STORAGE_KEY = "enzo-tasca-cookie-consent";
export const COOKIE_CONSENT_EMPTY_SNAPSHOT = "";
export const COOKIE_CONSENT_SERVER_SNAPSHOT = "server";
export const COOKIE_PREFERENCES_OPEN_EVENT = "cookie-preferences-open";

export function createCookieConsent({
  analytics,
  marketing,
}: {
  analytics: boolean;
  marketing: boolean;
}): CookieConsent {
  return {
    analytics,
    marketing,
    necessary: true,
    savedAt: new Date().toISOString(),
  };
}

export function readCookieConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as CookieConsent;
  } catch {
    return null;
  }
}

export function getCookieConsentSnapshot() {
  if (typeof window === "undefined") {
    return COOKIE_CONSENT_SERVER_SNAPSHOT;
  }

  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) ?? "";
}

export function getCookieConsentServerSnapshot() {
  return COOKIE_CONSENT_SERVER_SNAPSHOT;
}

export function subscribeCookieConsent(callback: () => void) {
  window.addEventListener("cookie-consent-change", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("cookie-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function writeCookieConsent(consent: CookieConsent) {
  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify(consent),
  );
  window.dispatchEvent(new Event("cookie-consent-change"));
}

export function clearCookieConsent() {
  window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  window.dispatchEvent(new Event("cookie-consent-change"));
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(COOKIE_PREFERENCES_OPEN_EVENT));
}
