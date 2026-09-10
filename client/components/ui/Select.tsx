import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, disabled, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            "focus-ring h-11 w-full appearance-none rounded-sm border border-mist bg-surface px-3 pr-9 text-sm text-ink transition-colors duration-150 focus:border-action cursor-pointer disabled:cursor-not-allowed disabled:bg-mist/30 disabled:opacity-60",
            error && "border-error focus:border-error",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate text-xs" aria-hidden="true">
          ▼
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";
