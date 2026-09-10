"use client";

import * as React from "react";
import { cn, formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Badge } from "./Badge";

export interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number; // integer cents
  oldPrice?: number; // integer cents
  size?: "default" | "lg";
  showDiscountBadge?: boolean;
}

export function Price({
  price,
  oldPrice,
  size = "default",
  showDiscountBadge = false,
  className,
  ...props
}: PriceProps) {
  const currency = useStore((state) => state.currency);
  const discountPercent =
    oldPrice && oldPrice > price
      ? Math.round((1 - price / oldPrice) * 100)
      : null;

  return (
    <div
      className={cn("inline-flex items-center gap-2 flex-wrap", className)}
      {...props}
    >
      <span
        className={cn(
          "font-display font-semibold tabular text-ink",
          size === "lg" ? "text-2xl md:text-3xl" : "text-[17px]"
        )}
      >
        {formatMoney(price, currency)}
      </span>

      {oldPrice && oldPrice > price && (
        <span
          className={cn(
            "line-through text-slate tabular font-display",
            size === "lg" ? "text-base" : "text-[13px]"
          )}
        >
          {formatMoney(oldPrice, currency)}
        </span>
      )}

      {showDiscountBadge && discountPercent && (
        <Badge variant="error">Save {discountPercent}%</Badge>
      )}
    </div>
  );
}
