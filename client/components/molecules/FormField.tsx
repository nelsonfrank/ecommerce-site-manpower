import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor?: string;
  fullWidth?: boolean;
  error?: string;
  hint?: string;
}

export function FormField({
  label,
  htmlFor,
  fullWidth = false,
  error,
  hint,
  className,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        fullWidth && "col-span-full",
        className
      )}
      {...props}
    >
      <label
        htmlFor={htmlFor}
        className="text-[13px] font-semibold text-ink leading-tight select-none"
      >
        {label}
      </label>

      {children}

      {hint && !error && (
        <span className="text-[12px] text-slate leading-tight">{hint}</span>
      )}

      {error && (
        <span className="text-[12px] font-medium text-error leading-tight" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
