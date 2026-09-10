"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, getProductById } from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OrderTimeline } from "@/components/organisms/OrderTimeline";

export default function DashboardOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const order = getOrderById(orderId);
  const currency = useStore((state) => state.currency);
  const addToCart = useStore((state) => state.addToCart);
  const showToast = useStore((state) => state.showToast);

  if (!order) {
    return (
      <div className="rounded-md border border-mist bg-surface p-12 text-center max-w-md mx-auto space-y-4">
        <h1 className="font-display font-semibold text-xl text-ink">
          Order Not Found
        </h1>
        <p className="text-slate text-sm">
          Could not find order #{orderId}.
        </p>
        <Button onClick={() => router.push("/dashboard/orders")}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const isDelivered = order.status === "delivered";

  const handleBuyAgain = () => {
    order.items.forEach((productId) => {
      addToCart(productId, 1);
    });
    showToast({
      message: `Items from Order #${order.id} added to cart`,
      actionLabel: "View cart",
      actionHref: "/cart",
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
            Order #{order.id}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate mt-1">
            Placed on {order.date} · Delivery confirmation sent to jordan@mail.com
          </p>
        </div>

        <Badge variant={isDelivered ? "success" : "warning"} withDot>
          {isDelivered ? "Delivered" : "In transit"}
        </Badge>
      </div>

      {/* Delivery Status Card */}
      <div className="rounded-md border border-mist bg-surface p-5 sm:p-6 shadow-sm">
        <h2 className="font-display font-semibold text-lg text-ink">
          Shipment Progress
        </h2>
        <OrderTimeline status={order.status} />
      </div>

      {/* Itemized list Card */}
      <div className="rounded-md border border-mist bg-surface p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="font-display font-semibold text-lg text-ink">
          Purchased Items ({order.items.length})
        </h2>

        <div className="divide-y divide-mist">
          {order.items.map((productId) => {
            const product = getProductById(productId);
            if (!product) return null;

            return (
              <div
                key={productId}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-[#f3f4f5] p-1 border border-mist">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/product/${product.id}`}
                      className="font-display font-semibold text-sm text-ink hover:text-action transition-colors block line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <span className="text-xs text-slate">Qty 1</span>
                  </div>
                </div>

                <span className="font-display tabular font-semibold text-sm text-ink shrink-0">
                  {formatMoney(product.price, currency)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-mist pt-4 flex justify-between items-center text-base">
          <span className="font-semibold text-ink">Order Total</span>
          <strong className="font-display tabular font-bold text-lg text-ink">
            {formatMoney(order.total, currency)}
          </strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleBuyAgain}>Buy again</Button>
        <Link href="/shop" className="focus-ring rounded-sm">
          <Button variant="secondary">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
}
