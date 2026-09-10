import * as React from "react";
import { cn } from "@/lib/utils";

export interface AccountLayoutProps {
  nav: React.ReactNode;
  content: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export function AccountLayout({
  nav,
  content,
  header,
  className,
}: AccountLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {header && <div>{header}</div>}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] gap-7 items-start">
        <div className="w-full">{nav}</div>
        <div className="min-w-0">{content}</div>
      </div>
    </div>
  );
}
