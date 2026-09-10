"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ORDERS, getProductById } from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";

export default function OrdersPage() {
  const currency = useStore((state) => state.currency);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
          Orders
        </h1>
        <p className="font-sans text-sm text-slate font-normal mt-1.5">
          Track purchases and view order details.
        </p>
      </div>

      <div className="grid gap-3 max-w-4xl">
        {ORDERS.map((order) => {
          const firstProduct = getProductById(order.items[0]);
          const isDelivered = order.status === "delivered";

          return (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="focus-ring block rounded-md border border-mist bg-surface p-4.5 transition-all duration-150 hover:border-slate/40 hover:shadow-card"
            >
              <div className="grid grid-cols-[56px_1fr] xs:grid-cols-[72px_1fr_auto] gap-3.5 xs:gap-4 items-center">
                {/* Thumb */}
                <div className="relative h-14 w-14 xs:h-[72px] xs:w-[72px] shrink-0 overflow-hidden rounded-sm bg-[#f3f4f5] p-1 border border-mist">
                  {firstProduct && (
                    <Image
                      src={firstProduct.img}
                      alt={firstProduct.name}
                      fill
                      sizes="72px"
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="font-display text-base font-semibold text-ink">
                      #{order.id}
                    </strong>
                    <Badge variant={isDelivered ? "success" : "warning"} withDot>
                      {isDelivered ? "Delivered" : "In transit"}
                    </Badge>
                  </div>
                  <div className="text-[13px] text-slate font-normal mt-1.5">
                    {order.date} · {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"} ·{" "}
                    <span className="font-display tabular font-medium text-ink">
                      {formatMoney(order.total, currency)}
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <span
                  className="hidden xs:block text-slate text-xl font-light pr-2"
                  aria-hidden="true"
                >
                  ›
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
