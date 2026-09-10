import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "focus-ring h-11 w-full rounded-sm border border-mist bg-surface px-3 text-sm text-ink transition-colors duration-150 placeholder:text-slate/60 focus:border-action disabled:cursor-not-allowed disabled:bg-mist/30 disabled:opacity-60",
          error && "border-error focus:border-error",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
