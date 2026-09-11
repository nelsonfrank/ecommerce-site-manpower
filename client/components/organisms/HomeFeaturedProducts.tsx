"use client";

import Link from "next/link";
import { useProductsQuery } from "@/lib/api/hooks/useProducts";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Button } from "@/components/ui/Button";

export default function HomeFeaturedProducts() {
  const { data, isLoading } = useProductsQuery({ limit: 4, page: 1 });
  const products = data?.products ?? [];

  return (
    <section aria-labelledby="popular-heading">
      <div className="flex items-center justify-between mb-3.5">
        <h2
          id="popular-heading"
          className="font-display font-semibold text-[22px] tracking-[-0.03em] text-ink"
        >
          Popular products
        </h2>
        <Link href="/shop" className="focus-ring rounded-sm">
          <Button variant="secondary" size="sm">View all</Button>
        </Link>
      </div>

      <ProductGrid products={products} isLoading={isLoading} />
    </section>
  );
}
