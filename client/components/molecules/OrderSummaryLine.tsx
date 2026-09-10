import * as React from "react";
import { cn } from "@/lib/utils";

export interface OrderSummaryLineProps {
  label: React.ReactNode;
  value: React.ReactNode;
  isTotal?: boolean;
  isMuted?: boolean;
  className?: string;
}

export function OrderSummaryLine({
  label,
  value,
  isTotal = false,
  isMuted = true,
  className,
}: OrderSummaryLineProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 text-sm my-3",
        isTotal &&
          "border-t border-mist pt-4 mt-4 text-lg font-semibold text-ink font-display",
        className
      )}
    >
      <span className={cn(isMuted && !isTotal ? "text-slate" : "text-ink")}>
        {label}
      </span>
      <span
        className={cn(
          "font-display tabular",
          isTotal ? "font-bold text-ink" : "font-medium text-ink"
        )}
      >
        {value}
      </span>
    </div>
  );
}
