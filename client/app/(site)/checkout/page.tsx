"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useCartQuery } from "@/lib/api/hooks/useCart";
import { useCheckoutMutation } from "@/lib/api/hooks/useOrders";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { StepIndicator } from "@/components/molecules/StepIndicator";
import { Button } from "@/components/ui/Button";
import { OrderSummaryLine } from "@/components/molecules/OrderSummaryLine";
import { CheckoutStepForms } from "@/components/organisms/CheckoutStepForms";
import { CheckoutLayout } from "@/components/templates/CheckoutLayout";
import type { AxiosError } from "axios";
import type { ApiErrorResponse, BackendOrder } from "@/lib/api/types";

const STEPS = ["Contact", "Delivery", "Shipping", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const currency = useStore((s) => s.currency);
  const accessToken = useStore((s) => s.accessToken);
  const user = useStore((s) => s.user);

  const { data: cart, isLoading: cartLoading } = useCartQuery();
  const checkoutMutation = useCheckoutMutation();

  const [currentStep, setCurrentStep] = React.useState(1);
  const [confirmedOrder, setConfirmedOrder] = React.useState<BackendOrder | null>(null);
  const [checkoutError, setCheckoutError] = React.useState("");

  const cartItems = cart?.items ?? [];
  const totalCents = Math.round((cart?.total ?? 0) * 100);

  // Redirect unauthenticated users to login
  React.useEffect(() => {
    if (!accessToken) {
      router.replace("/login?redirect=/checkout");
    }
  }, [accessToken, router]);

  // Redirect if cart becomes empty and no confirmed order
  React.useEffect(() => {
    if (!cartLoading && cartItems.length === 0 && !confirmedOrder) {
      router.replace("/cart");
    }
  }, [cartLoading, cartItems.length, confirmedOrder, router]);

  const handlePlaceOrder = () => {
    setCheckoutError("");
    checkoutMutation.mutate(undefined, {
      onSuccess: (order) => {
        setConfirmedOrder(order);
      },
      onError: (err) => {
        const axiosErr = err as AxiosError<ApiErrorResponse>;
        const msg = axiosErr.response?.data?.message;
        setCheckoutError(
          Array.isArray(msg) ? msg[0] : (msg ?? "Checkout failed. Please try again.")
        );
      },
    });
  };

  // ── Confirmation Screen ────────────────────────────────────────────────────
  if (confirmedOrder) {
    const confirmedTotal = Math.round(Number(confirmedOrder.totalAmount) * 100);
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
            Order{" "}
            <strong className="text-ink font-mono">
              #{confirmedOrder.id.slice(0, 8).toUpperCase()}
            </strong>{" "}
            has been placed successfully.
          </p>
        </div>

        <div className="rounded-md border border-mist bg-surface p-5 text-left shadow-card space-y-3">
          <div className="flex justify-between text-sm py-1 border-b border-mist">
            <span className="text-slate">Status</span>
            <strong className="text-ink font-semibold capitalize">
              {confirmedOrder.status.toLowerCase()}
            </strong>
          </div>
          <div className="flex justify-between text-sm py-1 border-b border-mist">
            <span className="text-slate">Total</span>
            <strong className="text-ink font-display font-bold tabular">
              {formatMoney(confirmedTotal, currency)}
            </strong>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-slate">Confirmation sent to</span>
            <span className="text-ink font-medium">{user?.email}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/dashboard/orders" className="focus-ring rounded-sm w-full sm:w-auto">
            <Button fullWidth className="sm:w-auto">Track order</Button>
          </Link>
          <Link href="/shop" className="focus-ring rounded-sm w-full sm:w-auto">
            <Button variant="secondary" fullWidth className="sm:w-auto">
              Continue shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const orderSidebar = (
    <aside className="rounded-md border border-mist bg-surface p-5 shadow-card md:sticky md:top-24 md:self-start">
      <h2 className="font-display font-semibold text-lg text-ink mb-4">Your order</h2>

      <div className="divide-y divide-mist">
        {cartItems.map((item) => {
          const lineCents = Math.round(item.subtotal * 100);
          return (
            <div key={item.id} className="py-2.5 flex justify-between gap-3 text-sm">
              <span className="text-slate line-clamp-1">
                {item.product.name} × {item.quantity}
              </span>
              <span className="font-display tabular font-medium text-ink shrink-0">
                {formatMoney(lineCents, currency)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-mist pt-3 mt-3">
        <OrderSummaryLine isTotal label="Total" value={formatMoney(totalCents, currency)} />
      </div>
    </aside>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

      <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
        Checkout
      </h1>

      {checkoutError && (
        <div className="rounded-sm bg-error-bg text-error p-3 text-sm font-semibold" role="alert">
          {checkoutError}
        </div>
      )}

      <CheckoutLayout
        stepper={<StepIndicator steps={STEPS} currentStep={currentStep} />}
        forms={
          <CheckoutStepForms
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={checkoutMutation.isPending}
            subtotal={totalCents}
          />
        }
        summary={orderSidebar}
      />
    </div>
  );
}
