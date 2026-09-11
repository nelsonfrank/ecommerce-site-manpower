"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from "@/lib/api/hooks/useCart";
import { useProductsQuery } from "@/lib/api/hooks/useProducts";
import { formatMoney } from "@/lib/utils";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { CartLayout } from "@/components/templates/CartLayout";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { CartSummary } from "@/components/organisms/CartSummary";

export default function CartPage() {
  const accessToken = useStore((s) => s.accessToken);
  const currency = useStore((s) => s.currency);

  const { data: remoteCart, isLoading } = useCartQuery();
  const updateItemMutation = useUpdateCartItemMutation();
  const removeItemMutation = useRemoveFromCartMutation();

  const { data: popularData } = useProductsQuery({ limit: 4 });
  const popularProducts = popularData?.products ?? [];

  const cartItems = remoteCart?.items ?? [];
  const total = remoteCart?.total ?? 0;
  const count = remoteCart?.totalItems ?? 0;

  // ── Empty state ────────────────────────────────────────────────────────────
  if (!isLoading && cartItems.length === 0) {
    return (
      <div className="space-y-12">
        <div className="max-w-md mx-auto py-16 px-4 text-center">
          <div
            className="w-16 h-16 rounded-full bg-[#eef0f3] text-2xl flex items-center justify-center mx-auto mb-4 select-none"
            aria-hidden="true"
          >
            🛒
          </div>
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-ink tracking-tight">
            Your cart is empty
          </h1>
          <p className="text-slate text-sm font-normal mt-2 mb-6 leading-relaxed">
            Add something you like and it will show up here.
          </p>
          <Link href="/shop" className="focus-ring rounded-sm inline-block">
            <Button>Browse products</Button>
          </Link>
        </div>

        {/* Suggested products */}
        {popularProducts.length > 0 && (
          <section className="pt-8 border-t border-mist">
            <h2 className="font-display font-semibold text-[22px] tracking-[-0.03em] text-ink mb-4">
              Popular products
            </h2>
            <ProductGrid products={popularProducts} />
          </section>
        )}
      </div>
    );
  }

  const itemList = (
    <div className="space-y-4">
      {isLoading ? (
        <div className="py-12 text-center text-slate text-sm animate-pulse">Loading cart…</div>
      ) : (
        cartItems.map((item) => {
          const subtotalCents = Math.round(item.subtotal * 100);
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-md border border-mist bg-surface p-4 shadow-sm"
            >
              {/* Product image */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-[#f3f4f5] border border-mist">
                {item.product.image && (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.product.id}`}
                  className="font-display font-semibold text-sm text-ink hover:text-action transition-colors line-clamp-1"
                >
                  {item.product.name}
                </Link>
                <p className="text-xs text-slate mt-0.5">
                  {formatMoney(Math.round(Number(item.product.price) * 100), currency)} each
                </p>
              </div>

              {/* Quantity + Subtotal + Remove */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <QuantitySelector
                  value={item.quantity}
                  min={1}
                  max={item.product.stockQuantity}
                  onChange={(qty) =>
                    updateItemMutation.mutate({ cartItemId: item.id, payload: { quantity: qty } })
                  }
                  disabled={updateItemMutation.isPending}
                />
                <div className="flex items-center gap-3">
                  <span className="font-display tabular font-semibold text-sm text-ink">
                    {formatMoney(subtotalCents, currency)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItemMutation.mutate(item.id)}
                    disabled={removeItemMutation.isPending}
                    className="text-xs text-slate hover:text-error transition-colors"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  const totalCents = Math.round(total * 100);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          { label: "Cart" },
        ]}
      />

      <div>
        <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
          Your cart
        </h1>
        <p className="font-sans text-sm text-slate font-normal mt-1.5">
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>

      <CartLayout
        items={itemList}
        summary={<CartSummary subtotal={totalCents} />}
      />
    </div>
  );
}
