import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CheckboxFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  description?: ReactNode;
  label: ReactNode;
};

export function CheckboxField({
  className,
  description,
  id,
  label,
  ...props
}: CheckboxFieldProps) {
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;

  return (
    <label
      className={cn(
        "flex items-start gap-4 rounded-ds-md text-left cursor-pointer",
        className,
      )}
      htmlFor={inputId}
    >
      <input
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-ds-blue focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ds-blue disabled:cursor-not-allowed disabled:opacity-60"
        id={inputId}
        type="checkbox"
        {...props}
      />
      <span>
        <span className="block text-body-md text-ds-ink">{label}</span>
        {description ? (
          <span className="mt-1 block text-body-sm text-ds-warm-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
