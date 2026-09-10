"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

export interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  emptyTitle?: string;
  emptyMessage?: string;
  onClearFilters?: () => void;
  className?: string;
}

export function ProductGrid({
  products = [],
  isLoading = false,
  skeletonCount = 6,
  emptyTitle = "No products found",
  emptyMessage = "Try adjusting your search or filters to find what you're looking for.",
  onClearFilters,
  className,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-5.5",
          className
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="flex flex-col min-w-0">
            <Skeleton className="aspect-square w-full rounded-md" />
            <div className="pt-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-9 w-full rounded-sm mt-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div
          className="w-16 h-16 rounded-full bg-[#eef0f3] text-slate text-2xl flex items-center justify-center mx-auto mb-4 select-none"
          aria-hidden="true"
        >
          ⌕
        </div>
        <h2 className="font-display font-semibold text-xl md:text-2xl text-ink tracking-tight">
          {emptyTitle}
        </h2>
        <p className="text-slate text-sm font-normal mt-2 leading-relaxed">
          {emptyMessage}
        </p>
        {onClearFilters && (
          <div className="mt-6">
            <Button variant="secondary" onClick={onClearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-5.5",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
