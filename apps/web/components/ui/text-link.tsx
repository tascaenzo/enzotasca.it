import { Link } from "@/i18n/routing";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextLinkTone = "muted" | "ink" | "blue" | "inverse" | "mint";
type TextLinkUnderline = "always" | "hover" | "none" | "subtle" | "thick";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  tone?: TextLinkTone;
  underline?: TextLinkUnderline;
};

const toneClasses: Record<TextLinkTone, string> = {
  muted: "text-link--tone-muted",
  ink: "text-link--tone-ink",
  blue: "text-link--tone-blue",
  inverse: "text-link--tone-inverse",
  mint: "text-link--tone-mint",
};

const underlineClasses: Record<TextLinkUnderline, string> = {
  always: "text-link--underline-always",
  hover: "text-link--underline-hover",
  none: "text-link--underline-none",
  subtle: "text-link--underline-subtle",
  thick: "text-link--underline-thick",
};

export function TextLink({
  children,
  className = "",
  href,
  rel,
  target,
  tone = "muted",
  underline = "always",
  ...props
}: TextLinkProps) {
  const isExternal = href.startsWith("http");
  const externalAriaLabel =
    isExternal && typeof children === "string"
      ? `${children} (apre in nuova finestra)`
      : undefined;

  const classes = cn(
    "text-link inline-flex w-fit cursor-pointer font-mono text-mono-sm",
    toneClasses[tone],
    underlineClasses[underline],
    className,
  );

  if (isExternal) {
    return (
      <a
        aria-label={externalAriaLabel}
        className={classes}
        href={href}
        rel={rel ?? "noreferrer"}
        target={target ?? "_blank"}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      className={classes}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
