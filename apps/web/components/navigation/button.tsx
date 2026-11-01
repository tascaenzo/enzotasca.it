import { type ButtonProps, Button as UiButton } from "@enzotasca/ui";
import { Link } from "@/i18n/routing";

export function Button(props: ButtonProps) {
  return <UiButton {...props} linkComponent={Link} />;
}
