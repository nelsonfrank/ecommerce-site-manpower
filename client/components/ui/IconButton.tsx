import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  size?: "default" | "sm";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      active = false,
      size = "default",
      disabled,
      children,
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const sizeClass = size === "sm" ? "w-8 h-8" : "w-10 h-10";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          "focus-ring inline-flex items-center justify-center rounded-sm border transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.96]",
          sizeClass,
          active
            ? "border-[#f0c9c9] bg-[#fdf6f6] text-error hover:bg-error-bg"
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

IconButton.displayName = "IconButton";
