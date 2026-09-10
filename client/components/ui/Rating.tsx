import * as React from "react";
import { cn } from "@/lib/utils";

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  reviews?: number;
  size?: "sm" | "default";
}

export function Rating({
  rating,
  reviews,
  size = "sm",
  className,
  ...props
}: RatingProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-[#6c4f00] font-sans",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="text-[#f5a623]">
        ★
      </span>
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-slate font-normal">({reviews})</span>
      )}
    </div>
  );
}
