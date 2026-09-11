"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useOrderDetailQuery } from "@/lib/api/hooks/useOrders";
import { useAddToCartMutation } from "@/lib/api/hooks/useCart";
import { useStore } from "@/lib/store";
import { formatMoney } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OrderTimeline } from "@/components/organisms/OrderTimeline";
import type { BackendOrderStatus } from "@/lib/api/types";

function statusLabel(status: BackendOrderStatus): string {
  switch (status) {
    case "COMPLETED": return "Delivered";
    case "PENDING": return "Pending";
    case "PROCESSING": return "In transit";
    case "CANCELLED": return "Cancelled";
  }
}

function statusVariant(status: BackendOrderStatus): "success" | "warning" | "error" {
  switch (status) {
    case "COMPLETED": return "success";
    case "CANCELLED": return "error";
    default: return "warning";
  }
}

// Map backend status to the timeline status expected by OrderTimeline
function mapTimelineStatus(status: BackendOrderStatus): "delivered" | "in_transit" {
  return status === "COMPLETED" ? "delivered" : "in_transit";
}

export default function DashboardOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const currency = useStore((s) => s.currency);
  const showToast = useStore((s) => s.showToast);

  const { data, isLoading, isError } = useOrderDetailQuery(orderId);
  const addToCartMutation = useAddToCartMutation();

  const order = data?.raw;

  if (isLoading) {
    return (
      <div className="py-12 text-center text-slate text-sm animate-pulse">
        Loading order details…
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="rounded-md border border-mist bg-surface p-12 text-center max-w-md mx-auto space-y-4">
        <h1 className="font-display font-semibold text-xl text-ink">Order Not Found</h1>
        <p className="text-slate text-sm">Could not find order #{orderId}.</p>
        <Button onClick={() => router.push("/dashboard/orders")}>Back to Orders</Button>
      </div>
    );
  }

  const totalCents = Math.round(Number(order.totalAmount) * 100);
  const placedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  const handleBuyAgain = () => {
    const promises = order.items.map((item) =>
      addToCartMutation.mutateAsync({ productId: item.productId, quantity: item.quantity })
    );
    Promise.allSettled(promises).then(() => {
      showToast({
        message: `Items from order re-added to cart`,
        actionLabel: "View cart",
        actionHref: "/cart",
      });
    });
  };

  return (
    <div className="space-y-6">
      {/* Top back navigation */}
      <div>
        <Link
          href="/dashboard/orders"
          className="text-xs font-semibold text-slate hover:text-ink transition-colors flex items-center gap-1.5"
        >
          <span>←</span> Back to all orders
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink tracking-tight">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate mt-1">
            Placed on {placedDate} · Confirmation sent to{" "}
            {useStore.getState().user?.email}
          </p>
        </div>

        <Badge variant={statusVariant(order.status)} withDot>
          {statusLabel(order.status)}
        </Badge>
      </div>

      {/* Delivery Status Card */}
      <div className="rounded-md border border-mist bg-surface p-5 sm:p-6 shadow-sm">
        <h2 className="font-display font-semibold text-lg text-ink">Shipment Progress</h2>
        <OrderTimeline status={mapTimelineStatus(order.status)} />
      </div>

      {/* Itemized list Card */}
      <div className="rounded-md border border-mist bg-surface p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="font-display font-semibold text-lg text-ink">
          Purchased Items ({order.items.length})
        </h2>

        <div className="divide-y divide-mist">
          {order.items.map((item) => {
            const priceCents = Math.round(Number(item.priceAtPurchase) * 100);
            const lineCents = priceCents * item.quantity;
            return (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-[#f3f4f5] p-1 border border-mist">
                    {item.product.image && (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/product/${item.product.id}`}
                      className="font-display font-semibold text-sm text-ink hover:text-action transition-colors block line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-xs text-slate">
                      Qty {item.quantity} · {formatMoney(priceCents, currency)} each
                    </span>
                  </div>
                </div>

                <span className="font-display tabular font-semibold text-sm text-ink shrink-0">
                  {formatMoney(lineCents, currency)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-mist pt-4 flex justify-between items-center text-base">
          <span className="font-semibold text-ink">Order Total</span>
          <strong className="font-display tabular font-bold text-lg text-ink">
            {formatMoney(totalCents, currency)}
          </strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={handleBuyAgain}
          disabled={addToCartMutation.isPending}
        >
          {addToCartMutation.isPending ? "Adding…" : "Buy again"}
        </Button>
        <Link href="/shop" className="focus-ring rounded-sm">
          <Button variant="secondary">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
}
