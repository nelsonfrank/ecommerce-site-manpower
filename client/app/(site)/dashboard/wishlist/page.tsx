"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/organisms/ProductGrid";

export default function DashboardWishlistPage() {
  const wishlist = useStore((state) => state.wishlist);

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink tracking-tight">
            Saved Wishlist
          </h1>
          <p className="font-sans text-sm text-slate mt-1">
            {savedProducts.length} saved {savedProducts.length === 1 ? "item" : "items"} in your account.
          </p>
        </div>

        <Link href="/shop" className="focus-ring shrink-0 rounded-sm">
          <Button variant="secondary" size="sm">
            Discover more
          </Button>
        </Link>
      </div>

      {/* Wishlist Items or Empty State */}
      {savedProducts.length === 0 ? (
        <div className="rounded-md border border-mist bg-surface p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div
            className="w-14 h-14 rounded-full bg-[#eef0f3] text-slate text-2xl flex items-center justify-center mx-auto select-none"
            aria-hidden="true"
          >
            ♡
          </div>
          <h2 className="font-display font-semibold text-xl text-ink">
            Your wishlist is empty
          </h2>
          <p className="font-sans text-slate text-sm">
            Explore our collection and click the heart icon on any product to save it here.
          </p>
          <div className="pt-2">
            <Link href="/shop" className="focus-ring rounded-sm inline-block">
              <Button>Browse products</Button>
            </Link>
          </div>
        </div>
      ) : (
        <ProductGrid products={savedProducts} />
      )}
    </div>
  );
}
