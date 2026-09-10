import * as React from "react";
import { cn } from "@/lib/utils";
import { ReviewBarRow } from "@/components/molecules/ReviewBarRow";

export interface ReviewSummaryProps {
  rating: number;
  totalReviews: number;
  distribution?: { stars: number; percentage: number }[];
  className?: string;
}

const DEFAULT_DISTRIBUTION = [
  { stars: 5, percentage: 72 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 6 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 1 },
];

export function ReviewSummary({
  rating,
  totalReviews,
  distribution = DEFAULT_DISTRIBUTION,
  className,
}: ReviewSummaryProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-mist bg-[#fafafa] p-4.5 flex flex-col sm:flex-row items-center gap-5 mt-7",
        className
      )}
    >
      {/* Big Rating Block */}
      <div className="text-center sm:min-w-[120px] shrink-0">
        <div className="font-display font-semibold text-4xl text-ink leading-none tabular">
          {rating.toFixed(1)}
        </div>
        <div className="text-[#f5a623] text-sm tracking-wide mt-1 select-none" aria-hidden="true">
          ★★★★★
        </div>
        <div className="text-xs text-slate font-sans mt-1">
          {totalReviews} reviews
        </div>
      </div>

      {/* Review Bars */}
      <div className="w-full flex-1 space-y-1">
        {distribution.map((item) => (
          <ReviewBarRow
            key={item.stars}
            stars={item.stars}
            percentage={item.percentage}
          />
        ))}
      </div>
    </div>
  );
}
