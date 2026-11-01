import { type InputHTMLAttributes, useId } from "react";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextField({
  className = "",
  id,
  label,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-sm text-ds-charcoal" htmlFor={inputId}>
        {label}
      </label>
      <input
        className={[
          "h-12.5 w-full cursor-text border-b border-ds-border-soft bg-transparent px-1 font-sans text-body-md text-ds-ink transition-colors",
          "placeholder:text-ds-muted hover:border-ds-muted-strong focus:border-ds-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-ds-blue focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-60 invalid:border-ds-blue-dark",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        id={inputId}
        {...props}
      />
    </div>
  );
}
