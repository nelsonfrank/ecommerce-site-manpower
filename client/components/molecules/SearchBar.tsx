"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  "aria-label"?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value: controlledValue,
  defaultValue = "",
  onChange,
  onClear,
  placeholder = "Search products, categories...",
  debounceMs = 180,
  className,
  "aria-label": ariaLabel = "Search products",
  autoFocus,
}: SearchBarProps) {
  const [innerValue, setInnerValue] = React.useState(
    controlledValue !== undefined ? controlledValue : defaultValue
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setInnerValue(controlledValue);
    }
  }, [controlledValue]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      onChange?.(innerValue);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [innerValue, debounceMs, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setInnerValue("");
      onClear?.();
      onChange?.("");
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <input
        type="text"
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoFocus={autoFocus}
        autoComplete="off"
        className="focus-ring h-11 w-full rounded-sm border border-mist bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-slate/60 focus:border-action transition-colors duration-150"
      />
      {innerValue && (
        <button
          type="button"
          onClick={() => {
            setInnerValue("");
            onClear?.();
            onChange?.("");
          }}
          aria-label="Clear search"
          className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded text-slate hover:text-ink text-sm p-0.5"
        >
          ✕
        </button>
      )}
    </div>
  );
}
