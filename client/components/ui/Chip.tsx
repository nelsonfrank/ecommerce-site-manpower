import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, active = false, children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "focus-ring inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3.5 py-2 font-sans text-[13px] font-semibold transition-colors duration-150 cursor-pointer select-none",
          active
            ? "border-ink bg-ink text-surface"
            : "border-mist bg-surface text-ink hover:bg-mist/40",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Chip.displayName = "Chip";
