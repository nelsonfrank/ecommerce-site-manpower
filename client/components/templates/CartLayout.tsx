import * as React from "react";
import { cn } from "@/lib/utils";

export interface CartLayoutProps {
  items: React.ReactNode;
  summary: React.ReactNode;
  className?: string;
}

export function CartLayout({ items, summary, className }: CartLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_340px] lg:grid-cols-[minmax(0,1fr)_360px] gap-7 items-start",
        className
      )}
    >
      <div className="min-w-0">{items}</div>
      <div className="w-full">{summary}</div>
    </div>
  );
}
