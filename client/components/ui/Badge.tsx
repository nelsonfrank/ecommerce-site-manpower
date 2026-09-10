import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "success" | "warning" | "error" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  withDot?: boolean;
}

export function Badge({
  className,
  variant = "neutral",
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    success: "bg-success-bg text-success",
    warning: "bg-warning-bg text-warning",
    error: "bg-error-bg text-error",
    neutral: "bg-[#eef0f3] text-slate",
  };

  const dotColor: Record<BadgeVariant, string> = {
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    neutral: "bg-slate",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
