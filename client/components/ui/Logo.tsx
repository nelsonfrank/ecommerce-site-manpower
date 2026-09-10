import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  asLink?: boolean;
  href?: string;
  onClick?: () => void;
}

export function Logo({
  className,
  asLink = true,
  href = "/",
  onClick,
}: LogoProps) {
  const content = (
    <span
      className={cn(
        "font-display text-[23px] font-bold tracking-[-0.04em] text-ink whitespace-nowrap select-none",
        className
      )}
    >
      NORTH & CO.
    </span>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="focus-ring inline-block rounded-sm transition-opacity hover:opacity-90"
        aria-label="North & Co. Home"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring cursor-pointer bg-transparent border-0 p-0 text-left"
      aria-label="North & Co. Home"
    >
      {content}
    </button>
  );
}
