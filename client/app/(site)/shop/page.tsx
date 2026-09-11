"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useProductsQuery } from "@/lib/api/hooks/useProducts";
import { useStore, type SortOption } from "@/lib/store";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Chip } from "@/components/ui/Chip";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { FilterSidebar } from "@/components/organisms/FilterSidebar";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { ShopLayout } from "@/components/templates/ShopLayout";
import type { Product } from "@/lib/data";

// Backend doesn't have categories; derive from product names for display grouping.
const CATEGORIES = ["All", "Electronics", "Accessories", "Office", "Kitchen"];

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const filters = useStore((state) => state.filters);
  const setCategory = useStore((state) => state.setCategory);
  const setSearch = useStore((state) => state.setSearch);
  const setSort = useStore((state) => state.setSort);
  const clearFilters = useStore((state) => state.clearFilters);
  const setFilterSheetOpen = useStore((state) => state.setFilterSheetOpen);

  // Track pagination
  const [page, setPage] = React.useState(1);
  const LIMIT = 12;

  React.useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [urlCategory, setCategory]);

  // Debounce search input
  const [debouncedSearch, setDebouncedSearch] = React.useState(filters.search);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search);
      setPage(1); // Reset page when search changes
    }, 300);
    return () => clearTimeout(handler);
  }, [filters.search]);

  const { data, isLoading, isError } = useProductsQuery({
    search: debouncedSearch || undefined,
    page,
    limit: LIMIT,
  });

  // Client-side sort on the fetched page
  const sortedProducts = React.useMemo(() => {
    if (!data?.products) return [];
    let list = [...data.products];

    if (filters.inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }
    if (filters.minPrice) {
      list = list.filter((p) => p.price >= Number(filters.minPrice) * 100);
    }
    if (filters.maxPrice) {
      list = list.filter((p) => p.price <= Number(filters.maxPrice) * 100);
    }
    if (filters.sort === "priceLow") {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "priceHigh") {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [data?.products, filters]);

  const meta = data?.meta;

  const toolbar = (
    <div className="space-y-4">
      {/* Title & Count & Mobile Filters Button */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
            Shop
          </h1>
          <p className="font-sans text-sm text-slate font-normal mt-1.5">
            {isLoading
              ? "Loading…"
              : `${meta?.total ?? 0} ${(meta?.total ?? 0) === 1 ? "product" : "products"}`}
          </p>
        </div>

        {/* Mobile Filter Trigger Button (hidden >= 820px) */}
        <div className="block md:hidden">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setFilterSheetOpen(true)}
            aria-label="Open filter options"
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Category Chips Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            active={filters.category === cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Chip>
        ))}
      </div>

      {/* Search & Sort Toolbar */}
      <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 pt-2">
        <div className="flex-1 max-w-xl">
          <SearchBar
            value={filters.search}
            onChange={setSearch}
            placeholder="Search products..."
          />
        </div>

        <div className="w-full xs:w-48 shrink-0">
          <Select
            value={filters.sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            aria-label="Sort products"
          >
            <option value="featured">Recommended</option>
            <option value="rating">Top rated</option>
            <option value="priceLow">Price: low to high</option>
            <option value="priceHigh">Price: high to low</option>
          </Select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <ShopLayout
        toolbar={toolbar}
        sidebar={<FilterSidebar />}
        content={
          <div className="space-y-6">
            {isError ? (
              <div className="py-12 text-center text-slate text-sm">
                Failed to load products. Please try again.
              </div>
            ) : (
              <ProductGrid
                products={sortedProducts as Product[]}
                isLoading={isLoading}
                emptyTitle={`No results for "${filters.search || filters.category}"`}
                emptyMessage="Try adjusting your search terms or clearing your filters."
                onClearFilters={clearFilters}
              />
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-slate">
                  Page {meta.page} of {meta.totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-slate">Loading shop...</div>}>
      <ShopContent />
    </React.Suspense>
  );
}
