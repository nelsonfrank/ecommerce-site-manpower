import * as React from "react";
import { cn } from "@/lib/utils";

export interface ShopLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  toolbar?: React.ReactNode;
  className?: string;
}

export function ShopLayout({
  sidebar,
  content,
  toolbar,
  className,
}: ShopLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {toolbar && <div>{toolbar}</div>}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[230px_1fr] gap-7 items-start">
        <div className="hidden md:block">{sidebar}</div>
        <div className="min-w-0">{content}</div>
      </div>
    </div>
  );
}
