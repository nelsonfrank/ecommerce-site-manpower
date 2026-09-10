"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES, type Product } from "@/lib/data";
import { useStore, type SortOption } from "@/lib/store";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Chip } from "@/components/ui/Chip";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { FilterSidebar } from "@/components/organisms/FilterSidebar";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { ShopLayout } from "@/components/templates/ShopLayout";

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const filters = useStore((state) => state.filters);
  const setCategory = useStore((state) => state.setCategory);
  const setSearch = useStore((state) => state.setSearch);
  const setSort = useStore((state) => state.setSort);
  const clearFilters = useStore((state) => state.clearFilters);
  const setFilterSheetOpen = useStore((state) => state.setFilterSheetOpen);

  React.useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [urlCategory, setCategory]);

  const categoryChips = ["All", ...CATEGORIES];

  // Filtering & Sorting
  const filteredProducts = React.useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      // Category filter
      if (filters.category !== "All" && p.category !== filters.category) {
        return false;
      }
      // In stock only
      if (filters.inStockOnly && p.stock <= 0) {
        return false;
      }
      // Search term
      if (
        filters.search &&
        !p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !p.desc.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      // Min price
      if (filters.minPrice && p.price < Number(filters.minPrice) * 100) {
        return false;
      }
      // Max price
      if (filters.maxPrice && p.price > Number(filters.maxPrice) * 100) {
        return false;
      }
      // Rating
      if (filters.minRating && p.rating < filters.minRating) {
        return false;
      }
      return true;
    });

    // Sorting
    if (filters.sort === "priceLow") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (filters.sort === "priceHigh") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (filters.sort === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [filters]);

  const toolbar = (
    <div className="space-y-4">
      {/* Title & Count & Mobile Filters Button */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
            Shop
          </h1>
          <p className="font-sans text-sm text-slate font-normal mt-1.5">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
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
        {categoryChips.map((cat) => (
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
          <ProductGrid
            products={filteredProducts}
            emptyTitle={`No results for "${filters.search || filters.category}"`}
            emptyMessage="Try adjusting your search terms or clearing your filters."
            onClearFilters={clearFilters}
          />
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
