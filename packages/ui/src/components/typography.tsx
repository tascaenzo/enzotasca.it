import type { HTMLAttributes, ReactNode } from "react";

export type TextProps<T extends string> = HTMLAttributes<HTMLElement> & {
  as?: T;
  children: ReactNode;
};

export function Eyebrow({
  as: Component = "p",
  children,
  className = "",
  ...props
}: TextProps<"p" | "span">) {
  return (
    <Component
      className={[
        "font-mono text-mono-eyebrow uppercase tracking-mono-eyebrow text-ds-warm-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Heading({
  as: Component = "h2",
  children,
  className = "",
  ...props
}: TextProps<"h1" | "h2" | "h3">) {
  return (
    <Component
      className={["font-sans text-headline-md text-ds-ink", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
