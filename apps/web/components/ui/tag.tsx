import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import type { TagVariant } from "@/types/content";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: string;
  variant?: TagVariant;
};

type TagListProps = HTMLAttributes<HTMLUListElement> & {
  items: string[];
  label: string;
  variant?: TagVariant;
};

const variantClasses: Record<TagVariant, string> = {
  default: "bg-ds-white text-ds-ink",
  mint: "bg-ds-green-ink text-ds-white",
};

export function Tag({
  children,
  className = "",
  variant = "default",
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-ds-md px-3 py-1 font-mono text-mono-sm",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function TagList({
  className = "",
  items,
  label,
  variant = "default",
  ...props
}: TagListProps) {
  return (
    <ul
      aria-label={label}
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {items.map((item) => (
        <li key={item}>
          <Tag variant={variant}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
