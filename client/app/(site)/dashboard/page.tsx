"use client";

import * as React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { ORDERS, getProductById } from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function DashboardOverviewPage() {
  const user = useStore((state) => state.user);
  const currency = useStore((state) => state.currency);
  const wishlist = useStore((state) => state.wishlist);

  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Customer";
  const recentOrders = ORDERS.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-md border border-mist bg-surface p-6 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-action">
            Member Dashboard
          </span>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink tracking-tight mt-1">
            Welcome back, {firstName}
          </h1>
          <p className="font-sans text-sm text-slate mt-1">
            Manage your purchases, update your profile settings, and check your saved items.
          </p>
        </div>

        <Link href="/shop" className="focus-ring shrink-0 rounded-sm">
          <Button size="sm">Explore shop</Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/orders"
          className="focus-ring rounded-md border border-mist bg-surface p-4 shadow-sm hover:border-slate/40 transition-all block"
        >
          <span className="text-xs font-semibold text-slate uppercase tracking-wider block">
            Total Orders
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <strong className="font-display text-2xl font-bold text-ink">
              {ORDERS.length}
            </strong>
            <span className="text-xs text-action font-semibold">View orders →</span>
          </div>
        </Link>

        <Link
          href="/dashboard/wishlist"
          className="focus-ring rounded-md border border-mist bg-surface p-4 shadow-sm hover:border-slate/40 transition-all block"
        >
          <span className="text-xs font-semibold text-slate uppercase tracking-wider block">
            Wishlist Items
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <strong className="font-display text-2xl font-bold text-ink">
              {wishlist.length}
            </strong>
            <span className="text-xs text-action font-semibold">View wishlist →</span>
          </div>
        </Link>

        <Link
          href="/dashboard/profile"
          className="focus-ring rounded-md border border-mist bg-surface p-4 shadow-sm hover:border-slate/40 transition-all block"
        >
          <span className="text-xs font-semibold text-slate uppercase tracking-wider block">
            Currency Preference
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <strong className="font-display text-2xl font-bold text-ink">
              {currency}
            </strong>
            <span className="text-xs text-action font-semibold">Change in profile →</span>
          </div>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="rounded-md border border-mist bg-surface p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-mist">
          <div>
            <h2 className="font-display font-semibold text-lg text-ink">
              Recent Orders
            </h2>
            <p className="font-sans text-xs text-slate">
              Check delivery status and order tracking.
            </p>
          </div>
          <Link
            href="/dashboard/orders"
            className="text-xs font-semibold text-action hover:text-action-hover underline"
          >
            All orders ({ORDERS.length})
          </Link>
        </div>

        <div className="divide-y divide-mist">
          {recentOrders.map((order) => {
            const firstProduct = getProductById(order.items[0]);
            const isDelivered = order.status === "delivered";

            return (
              <div
                key={order.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="font-display font-semibold text-sm text-ink">
                      Order #{order.id}
                    </strong>
                    <Badge variant={isDelivered ? "success" : "warning"} withDot>
                      {isDelivered ? "Delivered" : "In transit"}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate mt-1 block">
                    {order.date} · {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"} (
                    {firstProduct?.name || "Everyday Goods"})
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-display tabular font-bold text-sm text-ink">
                    {formatMoney(order.total, currency)}
                  </span>
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant="secondary" size="sm">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
