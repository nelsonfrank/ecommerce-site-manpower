"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { getProductById } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { StepIndicator } from "@/components/molecules/StepIndicator";
import { Button } from "@/components/ui/Button";
import { OrderSummaryLine } from "@/components/molecules/OrderSummaryLine";
import { CheckoutStepForms } from "@/components/organisms/CheckoutStepForms";
import { CheckoutLayout } from "@/components/templates/CheckoutLayout";

const STEPS = ["Contact", "Delivery", "Shipping", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const currency = useStore((state) => state.currency);
  const clearCart = useStore((state) => state.clearCart);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);

  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [confirmedTotal, setConfirmedTotal] = React.useState(0);

  const subtotal = getCartSubtotal();
  const cartEntries = Object.entries(cart);

  // If cart is empty on initial render and not confirmed, redirect back to /cart
  React.useEffect(() => {
    if (!isConfirmed && cartEntries.length === 0) {
      router.replace("/cart");
    }
  }, [isConfirmed, cartEntries.length, router]);

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    const totalToSave = subtotal;
    setConfirmedTotal(totalToSave);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      clearCart();
    }, 700);
  };

  // Confirmation Screen
  if (isConfirmed) {
    return (
      <div className="py-12 max-w-md mx-auto text-center space-y-6">
        <div
          className="w-16 h-16 rounded-full bg-success-bg text-success text-3xl font-bold flex items-center justify-center mx-auto select-none"
          aria-hidden="true"
        >
          ✓
        </div>

        <div>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink tracking-tight">
            Order confirmed!
          </h1>
          <p className="font-sans text-slate text-sm mt-2">
            Order <strong className="text-ink">#1043</strong> has been placed successfully.
          </p>
        </div>

        <div className="rounded-md border border-mist bg-surface p-5 text-left shadow-card space-y-3">
          <div className="flex justify-between text-sm py-1 border-b border-mist">
            <span className="text-slate">Estimated delivery</span>
            <strong className="text-ink font-semibold">Sep 12–14</strong>
          </div>
          <div className="flex justify-between text-sm py-1 border-b border-mist">
            <span className="text-slate">Total</span>
            <strong className="text-ink font-display font-bold tabular">
              {formatMoney(confirmedTotal, currency)}
            </strong>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-slate">Confirmation</span>
            <span className="text-ink font-medium">jordan@mail.com</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/orders" className="focus-ring rounded-sm w-full sm:w-auto">
            <Button fullWidth className="sm:w-auto">Track order</Button>
          </Link>
          <Link href="/shop" className="focus-ring rounded-sm w-full sm:w-auto">
            <Button variant="secondary" fullWidth className="sm:w-auto">Continue shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const orderSidebar = (
    <aside className="rounded-md border border-mist bg-surface p-5 shadow-card md:sticky md:top-24 md:self-start">
      <h2 className="font-display font-semibold text-lg text-ink mb-4">
        Your order
      </h2>

      <div className="divide-y divide-mist">
        {cartEntries.map(([id, qty]) => {
          const product = getProductById(id);
          if (!product) return null;

          return (
            <div key={id} className="py-2.5 flex justify-between gap-3 text-sm">
              <span className="text-slate line-clamp-1">
                {product.name} × {qty}
              </span>
              <span className="font-display tabular font-medium text-ink shrink-0">
                {formatMoney(product.price * qty, currency)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-mist pt-3 mt-3">
        <OrderSummaryLine
          isTotal
          label="Total"
          value={formatMoney(subtotal, currency)}
        />
      </div>
    </aside>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
        Checkout
      </h1>

      <CheckoutLayout
        stepper={
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        }
        forms={
          <CheckoutStepForms
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={isSubmitting}
            subtotal={subtotal}
          />
        }
        summary={orderSidebar}
      />
    </div>
  );
}
