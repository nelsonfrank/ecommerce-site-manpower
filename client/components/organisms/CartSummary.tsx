"use client";

import * as React from "react";
import Link from "next/link";
import { cn, formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OrderSummaryLine } from "@/components/molecules/OrderSummaryLine";

export interface CartSummaryProps {
  subtotal: number; // integer cents
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
  className?: string;
}

export function CartSummary({
  subtotal,
  showCheckoutButton = true,
  onCheckout,
  className,
}: CartSummaryProps) {
  const currency = useStore((state) => state.currency);
  const showToast = useStore((state) => state.showToast);
  const [promoCode, setPromoCode] = React.useState("");
  const [appliedPromo, setAppliedPromo] = React.useState(false);

  const qualifiesForFreeShipping = subtotal >= 5000;
  const shippingCost = qualifiesForFreeShipping ? 0 : 500;
  const estimatedTax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    setAppliedPromo(true);
    showToast({
      message: `Promo code "${promoCode.trim().toUpperCase()}" applied!`,
    });
  };

  return (
    <aside
      className={cn(
        "rounded-md border border-mist bg-surface p-5 shadow-card md:sticky md:top-24 md:self-start",
        className
      )}
    >
      <h2 className="font-display font-semibold text-lg text-ink">
        Order summary
      </h2>

      {/* Free Shipping Callout */}
      <div className="bg-success-bg text-success p-2.5 rounded-sm text-xs font-semibold my-4 leading-normal">
        {qualifiesForFreeShipping
          ? "✓ You qualify for free shipping"
          : `You're ${formatMoney(5000 - subtotal, currency)} away from free shipping`}
      </div>

      {/* Lines */}
      <div className="space-y-1">
        <OrderSummaryLine
          label="Subtotal"
          value={formatMoney(subtotal, currency)}
        />
        <OrderSummaryLine
          label="Shipping"
          value={qualifiesForFreeShipping ? "Free" : formatMoney(shippingCost, currency)}
        />
        <OrderSummaryLine
          label="Estimated tax"
          value={formatMoney(estimatedTax, currency)}
        />
        <OrderSummaryLine
          isTotal
          label="Total"
          value={formatMoney(total, currency)}
        />
      </div>

      {/* Checkout CTA */}
      {showCheckoutButton && (
        <div className="mt-5 space-y-2.5">
          {onCheckout ? (
            <Button fullWidth onClick={onCheckout}>
              Proceed to checkout
            </Button>
          ) : (
            <Link href="/checkout" className="focus-ring block rounded-sm">
              <Button fullWidth>Proceed to checkout</Button>
            </Link>
          )}

          <p className="text-center text-xs text-slate font-normal">
            Secure checkout · 30-day returns
          </p>
        </div>
      )}

      {/* Promo Code Form */}
      <form onSubmit={handleApplyPromo} className="flex gap-2 mt-5 pt-4 border-t border-mist">
        <Input
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          aria-label="Promo code"
          disabled={appliedPromo}
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={!promoCode.trim() || appliedPromo}
        >
          {appliedPromo ? "Applied" : "Apply"}
        </Button>
      </form>
    </aside>
  );
}
