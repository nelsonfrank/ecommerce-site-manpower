"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const showToast = useStore((state) => state.showToast);

  const handleSignOut = () => {
    logout();
    showToast({
      message: "You have been signed out.",
    });
    router.push("/login");
  };

  const navItems = [
    { label: "Profile", href: "/dashboard/profile", exact: false },
    { label: "Orders", href: "/dashboard/orders", exact: false },
    { label: "Wishlist", href: "/dashboard/wishlist", exact: false },
    { label: "Addresses", href: "/dashboard/profile#addresses", exact: false },
    { label: "Payment methods", href: "/dashboard/profile#payment", exact: false },
    { label: "Notifications", href: "/dashboard/profile#notifications", exact: false },
    { label: "Security", href: "/dashboard/profile#security", exact: false },
  ];

  return (
    <aside
      className={cn(
        "rounded-md border border-mist bg-surface p-2 shadow-sm flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1.5 select-none",
        className
      )}
      aria-label="Dashboard navigation"
    >
      {navItems.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "focus-ring block rounded-sm px-3 py-2.5 font-sans text-sm font-semibold transition-colors whitespace-nowrap md:w-full text-left",
              isActive
                ? "bg-[#f1f2f4] text-ink"
                : "text-slate hover:bg-[#f1f2f4] hover:text-ink"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}

      {user ? (
        <button
          type="button"
          onClick={handleSignOut}
          className="focus-ring block rounded-sm px-3 py-2.5 font-sans text-sm font-semibold text-error hover:bg-error-bg/60 transition-colors whitespace-nowrap md:w-full text-left cursor-pointer"
        >
          Sign out
        </button>
      ) : (
        <Link
          href="/login"
          className="focus-ring block rounded-sm px-3 py-2.5 font-sans text-sm font-semibold text-action hover:bg-action-subtle transition-colors whitespace-nowrap md:w-full text-left"
        >
          Sign in
        </Link>
      )}
    </aside>
  );
}
