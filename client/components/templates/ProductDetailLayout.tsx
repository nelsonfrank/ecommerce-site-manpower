import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProductDetailLayoutProps {
  gallery: React.ReactNode;
  details: React.ReactNode;
  relatedProducts?: React.ReactNode;
  className?: string;
}

export function ProductDetailLayout({
  gallery,
  details,
  relatedProducts,
  className,
}: ProductDetailLayoutProps) {
  return (
    <div className={cn("space-y-12", className)}>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] gap-7 md:gap-14 items-start">
        <div className="w-full">{gallery}</div>
        <div className="w-full min-w-0">{details}</div>
      </div>

      {relatedProducts && (
        <section className="pt-6 border-t border-mist">
          {relatedProducts}
        </section>
      )}
    </div>
  );
}
