import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  name: string;
  itemCountText: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function CategoryCard({
  name,
  itemCountText,
  href = `/shop?category=${encodeURIComponent(name)}`,
  onClick,
  className,
}: CategoryCardProps) {
  const content = (
    <div
      className={cn(
        "focus-ring rounded-md border border-mist bg-surface p-5 min-h-[120px] flex flex-col justify-end transition-all duration-150 shadow-sm hover:border-action hover:shadow-card cursor-pointer select-none text-left",
        className
      )}
    >
      <strong className="font-display text-lg font-semibold text-ink leading-tight">
        {name}
      </strong>
      <span className="font-sans text-[13px] text-slate font-normal mt-1">
        {itemCountText}
      </span>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left bg-transparent border-0 p-0"
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className="block w-full">
      {content}
    </Link>
  );
}
