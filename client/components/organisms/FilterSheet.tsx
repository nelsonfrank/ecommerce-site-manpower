"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

export function FilterSheet() {
  const isOpen = useStore((state) => state.filterSheetOpen);
  const setOpen = useStore((state) => state.setFilterSheetOpen);

  const inStockOnly = useStore((state) => state.filters.inStockOnly);
  const setInStockOnly = useStore((state) => state.setInStockOnly);
  const minPrice = useStore((state) => state.filters.minPrice);
  const maxPrice = useStore((state) => state.filters.maxPrice);
  const setPriceRange = useStore((state) => state.setPriceRange);
  const minRating = useStore((state) => state.filters.minRating);
  const setMinRating = useStore((state) => state.setMinRating);
  const clearFilters = useStore((state) => state.clearFilters);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[120] bg-ink/40 transition-opacity"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filterSheetTitle"
        className={cn(
          "fixed left-0 right-0 bottom-0 z-[130] bg-surface rounded-t-2xl p-5 pb-8 max-h-[78vh] overflow-y-auto shadow-sheet transition-transform duration-300 ease-out"
        )}
      >
        {/* Handle */}
        <div
          className="w-9 h-1 bg-[#d1d5db] rounded-full mx-auto mb-4"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-mist">
          <h3
            id="filterSheetTitle"
            className="font-display font-semibold text-lg text-ink"
          >
            Filters
          </h3>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="danger"
              onClick={() => clearFilters()}
            >
              Reset
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>

        {/* Availability */}
        <div className="py-4 border-b border-mist">
          <h4 className="font-sans text-sm font-semibold text-ink mb-3">
            Availability
          </h4>
          <Checkbox
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            label="In stock only"
          />
        </div>

        {/* Price */}
        <div className="py-4 border-b border-mist">
          <h4 className="font-sans text-sm font-semibold text-ink mb-3">
            Price ($)
          </h4>
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

        {/* Rating */}
        <div className="pt-4">
          <h4 className="font-sans text-sm font-semibold text-ink mb-3">
            Rating
          </h4>
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
      </div>
    </>
  );
}
