import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
  children: ReactNode;
};

export function Card({
  as: Component = "article",
  children,
  className = "",
  ...props
}: CardProps) {
  const hasCustomBackground = /(^|\s)bg-/.test(className);
  const hasCustomPadding = /(^|\s)p[trblxy]?-/.test(className);

  return (
    <Component
      className={cn(
        "rounded-ds-lg text-ds-ink",
        !hasCustomBackground && "bg-ds-surface",
        !hasCustomPadding && "p-8",
        "transition-[background-color,box-shadow,transform] focus-within:outline focus-within:outline-offset-2 focus-within:outline-ds-blue",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
