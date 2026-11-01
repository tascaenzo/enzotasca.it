import type { ReactNode } from "react";
import { cn } from "../utils/cn.ts";
import { Eyebrow, Heading } from "./typography.tsx";

export type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  id?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  id,
  as = "h2",
  className,
  eyebrowClassName,
  titleClassName,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Eyebrow className={eyebrowClassName}>{eyebrow}</Eyebrow>
      <Heading as={as} className={titleClassName} id={id}>
        {title}
      </Heading>
      {children}
    </div>
  );
}
