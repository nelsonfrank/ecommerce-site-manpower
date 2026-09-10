"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ORDERS } from "@/lib/data";

export interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const user = useStore((state) => state.user);
  const wishlist = useStore((state) => state.wishlist);
  const logout = useStore((state) => state.logout);
  const showToast = useStore((state) => state.showToast);

  const orderCount = ORDERS.length;
  const wishCount = wishlist.length;

  const handleSignOut = () => {
    logout();
    showToast({
      message: "You have been signed out.",
    });
    router.push("/login");
  };

  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      exact: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      exact: false,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
        </svg>
      ),
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      exact: false,
      badge: orderCount > 0 ? String(orderCount) : undefined,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12v18H6z" />
          <path d="M9 7h6M9 11h6M9 15h4" />
        </svg>
      ),
    },
    {
      label: "Wishlist",
      href: "/dashboard/wishlist",
      exact: false,
      badge: wishCount > 0 ? String(wishCount) : undefined,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z" />
        </svg>
      ),
    },
  ];

  const displayName = user?.fullName || "Guest Customer";
  const displayEmail = user?.email || "guest@mail.com";
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "GU";

  return (
    <aside
      className={cn(
        "rounded-md border border-mist bg-surface p-4 shadow-sm flex flex-col justify-between space-y-5",
        className
      )}
      aria-label="Dashboard navigation"
    >
      <div>
        {/* User Mini Profile Header */}
        <div className="flex items-center gap-3 pb-4 mb-3 border-b border-mist">
          <Avatar initials={initials} size="sm" />
          <div className="min-w-0 flex-1">
            <strong className="block font-display font-semibold text-sm text-ink truncate">
              {displayName}
            </strong>
            <span className="block font-sans text-xs text-slate truncate">
              {displayEmail}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1.5 pb-1 md:pb-0" aria-label="Dashboard views">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring flex items-center justify-between gap-3 rounded-sm px-3 py-2.5 font-sans text-sm font-semibold transition-all duration-150 whitespace-nowrap select-none",
                  isActive
                    ? "bg-action text-surface shadow-xs"
                    : "text-slate hover:bg-[#f1f2f4] hover:text-ink"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex items-center gap-2.5">
                  <span className={cn("shrink-0", isActive ? "text-surface" : "text-slate")}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "text-xs font-bold px-1.5 py-0.5 rounded-full",
                      isActive
                        ? "bg-surface/25 text-surface"
                        : "bg-mist text-slate"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions: Sign Out */}
      <div className="pt-3 border-t border-mist">
        <button
          type="button"
          onClick={handleSignOut}
          className="focus-ring flex items-center gap-2.5 w-full rounded-sm px-3 py-2 font-sans text-xs font-semibold text-error hover:bg-error-bg/60 transition-colors text-left cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
