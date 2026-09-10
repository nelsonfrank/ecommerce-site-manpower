"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCTS, getProductById } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CartItemList } from "@/components/organisms/CartItemList";
import { CartSummary } from "@/components/organisms/CartSummary";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { CartLayout } from "@/components/templates/CartLayout";

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const getCartCount = useStore((state) => state.getCartCount);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);

  const cartEntries = Object.entries(cart);
  const cartItems = cartEntries
    .map(([id, qty]) => {
      const product = getProductById(id);
      return product ? { product, quantity: qty } : null;
    })
    .filter(Boolean) as { product: (typeof PRODUCTS)[0]; quantity: number }[];

  const count = getCartCount();
  const subtotal = getCartSubtotal();

  if (cartItems.length === 0) {
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
        <section className="pt-8 border-t border-mist">
          <h2 className="font-display font-semibold text-[22px] tracking-[-0.03em] text-ink mb-4">
            Popular products
          </h2>
          <ProductGrid products={PRODUCTS.slice(0, 4)} />
        </section>
      </div>
    );
  }

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
        items={<CartItemList items={cartItems} />}
        summary={<CartSummary subtotal={subtotal} />}
      />
    </div>
  );
}
