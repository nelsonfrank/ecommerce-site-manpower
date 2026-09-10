"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

export interface FilterSidebarProps {
  className?: string;
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  const inStockOnly = useStore((state) => state.filters.inStockOnly);
  const setInStockOnly = useStore((state) => state.setInStockOnly);
  const minPrice = useStore((state) => state.filters.minPrice);
  const maxPrice = useStore((state) => state.filters.maxPrice);
  const setPriceRange = useStore((state) => state.setPriceRange);
  const minRating = useStore((state) => state.filters.minRating);
  const setMinRating = useStore((state) => state.setMinRating);

  return (
    <aside
      className={cn(
        "sticky top-24 self-start rounded-md border border-mist bg-surface p-4.5 shadow-sm hidden md:block",
        className
      )}
    >
      {/* Availability Section */}
      <div className="pb-4.5 border-b border-mist">
        <h3 className="font-sans text-sm font-semibold text-ink mb-3">
          Availability
        </h3>
        <Checkbox
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          label="In stock only"
        />
      </div>

      {/* Price Section */}
      <div className="py-4.5 border-b border-mist">
        <h3 className="font-sans text-sm font-semibold text-ink mb-3">
          Price ($)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Min"
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) => setPriceRange(e.target.value, maxPrice)}
            aria-label="Minimum price"
          />
          <Input
            placeholder="Max"
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setPriceRange(minPrice, e.target.value)}
            aria-label="Maximum price"
          />
        </div>
      </div>

      {/* Rating Section */}
      <div className="pt-4.5">
        <h3 className="font-sans text-sm font-semibold text-ink mb-3">
          Rating
        </h3>
        <div className="flex flex-col gap-2.5">
          <Checkbox
            checked={minRating === 4}
            onChange={(e) => setMinRating(e.target.checked ? 4 : null)}
            label="★ 4 and up"
          />
          <Checkbox
            checked={minRating === 3}
            onChange={(e) => setMinRating(e.target.checked ? 3 : null)}
            label="★ 3 and up"
          />
        </div>
      </div>
    </aside>
  );
}
