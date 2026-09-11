"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useOrdersQuery } from "@/lib/api/hooks/useOrders";
import { useStore } from "@/lib/store";
import { formatMoney } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import type { BackendOrderStatus } from "@/lib/api/types";

type FilterOption = "all" | BackendOrderStatus;

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

export default function DashboardOrdersPage() {
  const currency = useStore((s) => s.currency);
  const [filter, setFilter] = React.useState<FilterOption>("all");

  const { data: orders = [], isLoading, isError } = useOrdersQuery();

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

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
        <div className="flex items-center gap-2 flex-wrap">
          <Chip active={filter === "all"} onClick={() => setFilter("all")}>
            All ({orders.length})
          </Chip>
          <Chip active={filter === "COMPLETED"} onClick={() => setFilter("COMPLETED")}>
            Delivered
          </Chip>
          <Chip active={filter === "PROCESSING"} onClick={() => setFilter("PROCESSING")}>
            In transit
          </Chip>
          <Chip active={filter === "PENDING"} onClick={() => setFilter("PENDING")}>
            Pending
          </Chip>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid gap-3.5">
        {isLoading ? (
          <div className="rounded-md border border-mist bg-surface p-12 text-center text-slate animate-pulse">
            <p className="text-sm font-sans">Loading orders…</p>
          </div>
        ) : isError ? (
          <div className="rounded-md border border-mist bg-surface p-12 text-center text-error">
            <p className="text-sm font-sans">Failed to load orders.</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-md border border-mist bg-surface p-12 text-center text-slate">
            <p className="text-sm font-sans">No orders found in this category.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const firstItem = order.items[0];
            const firstProduct = firstItem?.product;
            const totalCents = Math.round(Number(order.totalAmount) * 100);
            const placedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            });

            return (
              <div
                key={order.id}
                className="rounded-md border border-mist bg-surface p-4.5 sm:p-5 shadow-sm hover:border-slate/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-[#f3f4f5] p-1 border border-mist">
                    {firstProduct?.image && (
                      <Image
                        src={firstProduct.image}
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
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </strong>
                      <Badge variant={statusVariant(order.status)} withDot>
                        {statusLabel(order.status)}
                      </Badge>
                    </div>
                    <div className="text-xs sm:text-sm text-slate font-normal mt-1">
                      Placed on {placedDate} · {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-mist">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate block">Total</span>
                    <span className="font-display tabular font-bold text-base text-ink">
                      {formatMoney(totalCents, currency)}
                    </span>
                  </div>

                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant="secondary" size="sm">View details</Button>
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
