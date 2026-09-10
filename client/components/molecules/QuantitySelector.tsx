"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
  size?: "default" | "sm";
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  className,
  size = "default",
}: QuantitySelectorProps) {
  const canDecrease = !disabled && value > min;
  const canIncrease = !disabled && value < max;

  const handleDecrease = () => {
    if (canDecrease) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (canIncrease) {
      onChange(value + 1);
    }
  };

  const sizeStyles = {
    default: "h-11 w-32 text-base",
    sm: "h-9 w-28 text-sm",
  }[size];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between rounded-sm border border-mist bg-surface select-none",
        sizeStyles,
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
        className="focus-ring h-full w-10 flex items-center justify-center text-lg text-ink font-semibold transition-colors hover:bg-mist/30 active:bg-mist/50 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        −
      </button>

      <strong className="font-display font-semibold tabular text-ink">
        {value}
      </strong>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={!canIncrease}
        aria-label="Increase quantity"
        className="focus-ring h-full w-10 flex items-center justify-center text-lg text-ink font-semibold transition-colors hover:bg-mist/30 active:bg-mist/50 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        +
      </button>
    </div>
  );
}
