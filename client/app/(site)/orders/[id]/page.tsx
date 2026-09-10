"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, getProductById } from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OrderTimeline } from "@/components/organisms/OrderTimeline";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const order = getOrderById(orderId);
  const currency = useStore((state) => state.currency);
  const addToCart = useStore((state) => state.addToCart);
  const showToast = useStore((state) => state.showToast);

  if (!order) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h1 className="font-display font-semibold text-2xl text-ink">
          Order Not Found
        </h1>
        <p className="text-slate text-sm mt-2 mb-6">
          Could not find order #{orderId}.
        </p>
        <Button onClick={() => router.push("/orders")}>Back to Orders</Button>
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
    <div className="space-y-6 max-w-4xl">
      <Breadcrumb
        items={[
          { label: "Orders", href: "/orders" },
          { label: `Order #${order.id}` },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
            Order #{order.id}
          </h1>
          <p className="font-sans text-sm text-slate font-normal mt-1">
            Placed {order.date}
          </p>
        </div>

        <Badge variant={isDelivered ? "success" : "warning"} withDot>
          {isDelivered ? "Delivered" : "In transit"}
        </Badge>
      </div>

      {/* Delivery Status Card */}
      <div className="rounded-md border border-mist bg-surface p-5 shadow-sm">
        <h2 className="font-display font-semibold text-lg text-ink">
          Delivery status
        </h2>
        <OrderTimeline status={order.status} />
      </div>

      {/* Itemized list Card */}
      <div className="rounded-md border border-mist bg-surface p-5 shadow-sm space-y-4">
        <h2 className="font-display font-semibold text-lg text-ink">Items</h2>

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
          <span className="font-semibold text-ink">Total</span>
          <strong className="font-display tabular font-bold text-lg text-ink">
            {formatMoney(order.total, currency)}
          </strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleBuyAgain}>Buy again</Button>
        <Button variant="secondary">Need help?</Button>
      </div>
    </div>
  );
}
