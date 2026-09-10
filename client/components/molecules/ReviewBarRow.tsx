import * as React from "react";
import { cn } from "@/lib/utils";

export interface ReviewBarRowProps {
  stars: number;
  percentage: number;
  className?: string;
}

export function ReviewBarRow({
  stars,
  percentage,
  className,
}: ReviewBarRowProps) {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs text-slate font-sans",
        className
      )}
    >
      <span className="w-3 text-right font-medium text-ink">{stars}</span>
      <span className="text-[#f5a623] text-xs">★</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eef0f3]">
        <div
          className="h-full rounded-full bg-[#f5a623] transition-all duration-300"
          style={{ width: `${safePercentage}%` }}
          role="progressbar"
          aria-valuenow={safePercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <span className="w-8 text-right tabular text-[11px] text-slate font-mono">
        {safePercentage}%
      </span>
    </div>
  );
}
