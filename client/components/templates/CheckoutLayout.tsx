import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckoutLayoutProps {
  stepper: React.ReactNode;
  forms: React.ReactNode;
  summary: React.ReactNode;
  className?: string;
}

export function CheckoutLayout({
  stepper,
  forms,
  summary,
  className,
}: CheckoutLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {stepper && <div>{stepper}</div>}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_340px] lg:grid-cols-[minmax(0,1fr)_360px] gap-7 items-start">
        <div className="min-w-0">{forms}</div>
        <div className="w-full">{summary}</div>
      </div>
    </div>
  );
}
