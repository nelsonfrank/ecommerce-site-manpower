"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Logo } from "@/components/ui/Logo";
import { IconButton } from "@/components/ui/IconButton";

export function MobileDrawer() {
  const isOpen = useStore((state) => state.mobileMenuOpen);
  const setOpen = useStore((state) => state.setMobileMenuOpen);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/40 transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
    >
      <aside
        className={cn(
          "relative h-full w-[min(340px,88vw)] bg-surface p-5 shadow-card overflow-y-auto flex flex-col justify-between transition-transform duration-300 ease-out"
        )}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-2">
            <Logo onClick={() => setOpen(false)} />
            <IconButton
              size="sm"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </IconButton>
          </div>

          {/* Primary Nav */}
          <nav className="flex flex-col py-2" aria-label="Mobile Primary">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="focus-ring py-2.5 font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="focus-ring py-2.5 font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
            >
              Shop all
            </Link>
            <Link
              href="/shop?category=All"
              onClick={() => setOpen(false)}
              className="focus-ring py-2.5 font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/orders"
              onClick={() => setOpen(false)}
              className="focus-ring py-2.5 font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
            >
              Orders
            </Link>
          </nav>

          {/* Account Section */}
          <div className="border-t border-mist pt-4 mt-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate mb-2">
              Account
            </span>
            <div className="flex flex-col">
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="focus-ring py-2 font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
              >
                Profile
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="focus-ring py-2 font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
              >
                Wishlist
              </Link>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="focus-ring py-2 font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
              >
                Addresses
              </Link>
              {useStore.getState().user ? (
                <button
                  type="button"
                  onClick={() => {
                    useStore.getState().logout();
                    useStore.getState().showToast({ message: "You have been signed out." });
                    setOpen(false);
                  }}
                  className="focus-ring py-2 text-left font-sans text-sm font-semibold text-error hover:text-error/80 transition-colors"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="focus-ring py-2 font-sans text-sm font-semibold text-action hover:text-action-hover transition-colors"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="border-t border-mist pt-4 mt-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate mb-2">
              Help
            </span>
            <div className="flex flex-col">
              <button
                type="button"
                className="focus-ring py-2 text-left font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
              >
                Help center
              </button>
              <button
                type="button"
                className="focus-ring py-2 text-left font-sans text-sm font-semibold text-ink hover:text-action transition-colors"
              >
                Contact us
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-mist pt-4 text-xs text-slate">
          © 2026 North & Co. All rights reserved.
        </div>
      </aside>
    </div>
  );
}
