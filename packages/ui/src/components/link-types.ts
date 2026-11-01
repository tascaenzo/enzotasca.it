import type { AnchorHTMLAttributes, ComponentType } from "react";

// Consumers can supply a router-aware component without coupling UI to a router.
export type LinkComponent = ComponentType<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>;
