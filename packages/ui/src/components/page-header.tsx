import type { ReactNode } from "react";
import { cn } from "../utils/cn.ts";
import { Container } from "./container.tsx";
import { Section } from "./section.tsx";
import { Eyebrow } from "./typography.tsx";

export type PageHeaderProps = {
  eyebrow: string;
  title: string;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  className,
  containerClassName,
  children,
}: PageHeaderProps) {
  return (
    <Section className={cn("pt-20 md:pt-32", className)}>
      <Container className={cn("max-w-3xl", containerClassName)}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 text-headline-lg text-ds-ink">{title}</h1>
        {children}
      </Container>
    </Section>
  );
}
