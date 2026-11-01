import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "../utils/cn.ts";
import type { LinkComponent } from "./link-types.ts";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "outline"
  | "outlineInverse";
export type ButtonSize = "md" | "lg";

const baseClasses =
  "inline-flex cursor-pointer appearance-none items-center justify-center rounded-ds-xl font-sans transition-[background-color,color,border-color,transform] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-blue disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-ds-ink bg-ds-ink text-white hover:border-ds-charcoal hover:bg-ds-charcoal",
  accent:
    "border border-ds-blue bg-ds-blue !text-ds-white hover:border-ds-blue-dark hover:bg-ds-blue-dark hover:!text-ds-white",
  secondary:
    "border border-ds-border-soft bg-transparent text-ds-ink hover:bg-ds-surface",
  ghost:
    "border border-transparent bg-transparent text-ds-ink hover:bg-ds-surface hover:text-ds-blue",
  outline:
    "border border-ds-ink bg-transparent text-ds-ink hover:border-ds-blue hover:bg-ds-blue/10 hover:text-ds-blue",
  outlineInverse:
    "border border-ds-white bg-transparent text-ds-white hover:border-ds-mint hover:bg-ds-mint/10 hover:text-ds-mint focus-visible:outline-ds-mint",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-12 px-8 text-body-md",
  lg: "h-[60px] px-10 text-body-lg",
};

export type SharedProps = {
  linkComponent?: LinkComponent;
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  linkComponent,
  className = "",
  size = "lg",
  variant = "primary",
  ...props
}: ButtonProps) {
  const Link = linkComponent ?? "a";
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, rel, target, ...anchorProps } = props;
    const isExternal = href.startsWith("http");

    return (
      <Link
        className={classes}
        href={href}
        rel={rel ?? (isExternal ? "noreferrer" : undefined)}
        target={target ?? (isExternal ? "_blank" : undefined)}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      className={classes}
      type={buttonProps.type ?? "button"}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
