"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/navigation/button";
import { Link } from "@/i18n/routing";

type NavItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  navItems: NavItem[];
};

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("nav");

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      const firstFocusable =
        menuRef.current?.querySelector<HTMLElement>(focusableSelector);
      requestAnimationFrame(() => firstFocusable?.focus());
    } else {
      hamburgerRef.current?.focus();
    }
  }, [isMenuOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !menuRef.current) return;

    const focusableElements =
      menuRef.current.querySelectorAll<HTMLElement>(focusableSelector);
    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <button
        ref={hamburgerRef}
        aria-controls="mobile-menu"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
        className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-ds-xl border border-ds-border-soft bg-ds-surface text-ds-ink transition-colors hover:border-ds-blue hover:bg-ds-white hover:text-ds-blue focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ds-blue md:hidden"
        onClick={() => setIsMenuOpen((open) => !open)}
        type="button"
      >
        <span
          className={[
            "h-0.5 w-5 bg-current transition-transform",
            isMenuOpen && "translate-y-2 rotate-45",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <span
          className={[
            "h-0.5 w-5 bg-current transition-opacity",
            isMenuOpen && "opacity-0",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <span
          className={[
            "h-0.5 w-5 bg-current transition-transform",
            isMenuOpen && "-translate-y-2 -rotate-45",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </button>

      <div
        ref={menuRef}
        aria-hidden={!isMenuOpen}
        aria-label={t("navLabel")}
        className={[
          "fixed inset-0 z-50 bg-ds-ink text-ds-white transition-[opacity,visibility] md:hidden",
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0",
        ]
          .filter(Boolean)
          .join(" ")}
        id="mobile-menu"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal={isMenuOpen ? true : undefined}
      >
        <div className="flex min-h-screen flex-col px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-3 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ds-mint"
              href="/"
              onClick={closeMenu}
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-ds-xl bg-ds-mint font-mono text-mono-sm text-ds-green-ink"
              >
                ET
              </span>
              <span className="flex flex-col">
                <span className="text-body-md">{t("siteTitle")}</span>
                <span className="font-mono text-mono-sm uppercase text-ds-slate-muted">
                  {t("siteSubtitle")}
                </span>
              </span>
            </Link>
            <button
              aria-label={t("closeMenu")}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-ds-xl border border-ds-white/20 text-ds-white transition-colors hover:border-ds-mint hover:text-ds-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-mint"
              onClick={closeMenu}
              type="button"
            >
              <span aria-hidden="true" className="text-title-md leading-none">
                x
              </span>
            </button>
          </div>

          <nav
            aria-label={t("navLabelMobile")}
            className="flex flex-1 items-center pt-12"
          >
            <ul className="flex w-full flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    className="group flex items-center justify-between border-b border-ds-white/15 pb-4 text-headline-sm transition-colors hover:text-ds-mint focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ds-mint"
                    href={item.href}
                    onClick={closeMenu}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-body-lg text-ds-slate-muted transition-transform group-hover:translate-x-1 group-hover:text-ds-mint"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  className="mt-4 w-full"
                  href="#newsletter"
                  onClick={closeMenu}
                  variant="outlineInverse"
                >
                  {t("newsletter")}
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
