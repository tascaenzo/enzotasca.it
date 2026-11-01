import type { HTMLAttributes, ReactNode } from "react";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section
      className={["py-20 md:py-32", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </section>
  );
}
