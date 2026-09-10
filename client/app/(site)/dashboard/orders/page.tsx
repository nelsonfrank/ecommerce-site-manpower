"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ORDERS, getProductById, type OrderStatus } from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

export default function DashboardOrdersPage() {
  const currency = useStore((state) => state.currency);
  const [filter, setFilter] = React.useState<"all" | OrderStatus>("all");

  const filteredOrders = ORDERS.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink tracking-tight">
            Order History
          </h1>
          <p className="font-sans text-sm text-slate mt-1">
            Track packages, view receipts, and reorder previous goods.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2">
          <Chip active={filter === "all"} onClick={() => setFilter("all")}>
            All ({ORDERS.length})
          </Chip>
          <Chip
            active={filter === "delivered"}
            onClick={() => setFilter("delivered")}
          >
            Delivered
          </Chip>
          <Chip
            active={filter === "in_transit"}
            onClick={() => setFilter("in_transit")}
          >
            In transit
          </Chip>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid gap-3.5">
        {filteredOrders.length === 0 ? (
          <div className="rounded-md border border-mist bg-surface p-12 text-center text-slate">
            <p className="text-sm font-sans">No orders found in this category.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const firstProduct = getProductById(order.items[0]);
            const isDelivered = order.status === "delivered";

            return (
              <div
                key={order.id}
                className="rounded-md border border-mist bg-surface p-4.5 sm:p-5 shadow-sm hover:border-slate/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-[#f3f4f5] p-1 border border-mist">
                    {firstProduct && (
                      <Image
                        src={firstProduct.img}
                        alt={firstProduct.name}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="font-display text-base font-semibold text-ink">
                        Order #{order.id}
                      </strong>
                      <Badge
                        variant={isDelivered ? "success" : "warning"}
                        withDot
                      >
                        {isDelivered ? "Delivered" : "In transit"}
                      </Badge>
                    </div>

                    <div className="text-xs sm:text-sm text-slate font-normal mt-1">
                      Placed on {order.date} · {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-mist">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate block">Total</span>
                    <span className="font-display tabular font-bold text-base text-ink">
                      {formatMoney(order.total, currency)}
                    </span>
                  </div>

                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant="secondary" size="sm">
                      View details
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
