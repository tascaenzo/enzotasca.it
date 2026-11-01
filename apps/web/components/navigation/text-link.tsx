import { type TextLinkProps, TextLink as UiTextLink } from "@enzotasca/ui";
import { Link } from "@/i18n/routing";

export function TextLink(props: Omit<TextLinkProps, "linkComponent">) {
  return <UiTextLink {...props} linkComponent={Link} />;
}
