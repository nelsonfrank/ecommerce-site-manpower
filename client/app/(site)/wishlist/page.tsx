"use client";

import * as React from "react";
import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { useProductsQuery } from "@/lib/api/hooks";

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);

  const { data, isLoading } = useProductsQuery();

  const products = data?.products;

  const savedProducts = useMemo(
    () => products? products?.filter((p) => wishlist.includes(p.id)) : [],
    [products, wishlist]
  );

  if(isLoading){
    return <div>Loading...</div>
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
          Wishlist
        </h1>
        <p className="font-sans text-sm text-slate font-normal mt-1.5">
          {savedProducts.length} saved{" "}
          {savedProducts.length === 1 ? "item" : "items"}
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="max-w-md mx-auto py-16 px-4 text-center">
          <div
            className="w-16 h-16 rounded-full bg-[#eef0f3] text-slate text-2xl flex items-center justify-center mx-auto mb-4 select-none"
            aria-hidden="true"
          >
            ♡
          </div>
          <h2 className="font-display font-semibold text-xl md:text-2xl text-ink tracking-tight">
            Your wishlist is empty
          </h2>
          <p className="text-slate text-sm font-normal mt-2 mb-6 leading-relaxed">
            Save products you want to come back to.
          </p>
          <Link href="/shop" className="focus-ring rounded-sm inline-block">
            <Button>Explore products</Button>
          </Link>
        </div>
      ) : (
        <ProductGrid products={savedProducts} />
      )}
    </div>
  );
}
