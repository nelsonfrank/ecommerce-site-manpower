import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "default" | "sm";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      fullWidth = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "focus-ring inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-sm transition-all duration-150 select-none cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      default: "h-11 px-4 text-sm",
      sm: "h-9 px-3 text-[13px]",
    }[size];

    const variantStyles = {
      primary: "bg-action text-surface hover:bg-action-hover shadow-sm",
      secondary: "bg-surface text-ink border border-mist hover:bg-mist/40",
      danger: "text-error bg-transparent hover:bg-error-bg",
    }[variant];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          baseStyles,
          sizeStyles,
          variantStyles,
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
