"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Logo } from "@/components/ui/Logo";
import { IconButton } from "@/components/ui/IconButton";
import { SearchBar } from "@/components/molecules/SearchBar";
import { useCartQuery } from "@/lib/api/hooks";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const wishlist = useStore((state) => state.wishlist);
  const setMobileMenuOpen = useStore((state) => state.setMobileMenuOpen);
  const setSearch = useStore((state) => state.setSearch);
  const searchValue = useStore((state) => state.filters.search);
  const { data: cart } = useCartQuery();
  const cartCount = cart?.items.length || 0;
  const displayCartCount = cartCount > 9 ? "9+" : cartCount;

  const wishCount = wishlist.length;
  const displayWishCount = wishCount > 9 ? "9+" : wishCount;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/shop?category=All" },
  ];

  const handleSearchChange = (query: string) => {
    setSearch(query);
    if (pathname !== "/shop" && query.trim()) {
      router.push("/shop");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-mist">
      {/* Desktop Header (>= 1100px) */}
      <div className="hidden lg:flex h-[72px] max-w-[1280px] mx-auto px-6 items-center gap-6">
        <Logo href="/" />

        <nav className="flex items-center gap-5" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("?")[0]);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "focus-ring rounded-xs font-sans text-sm font-semibold transition-colors py-1",
                  isActive
                    ? "text-ink"
                    : "text-slate hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1 max-w-[620px]">
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search products, categories..."
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Wishlist Button */}
          <Link href="/wishlist" className="relative focus-ring rounded-sm" aria-label="Wishlist">
            <IconButton aria-label="Wishlist" title="Wishlist">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z" />
              </svg>
            </IconButton>
            {wishCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-action px-1 text-[10px] font-bold text-surface font-sans">
                {displayWishCount}
              </span>
            )}
          </Link>

          {/* Account Button */}
          <Link href="/dashboard/profile" className="focus-ring rounded-sm" aria-label="Account">
            <IconButton aria-label="Account" title="Account">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
              </svg>
            </IconButton>
          </Link>

          {/* Cart Button */}
          <Link href="/cart" className="relative focus-ring rounded-sm" aria-label="Shopping cart">
            <IconButton aria-label="Shopping cart" title="Shopping cart">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 8h12l-1 12H7L6 8Z" />
                <path d="M9 8a3 3 0 0 1 6 0" />
              </svg>
            </IconButton>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-action px-1 text-[10px] font-bold text-surface font-sans">
                {displayCartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Header (< 1100px) */}
      <div className="flex lg:hidden h-16 max-w-[1280px] mx-auto px-4 items-center justify-between">
        <IconButton
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </IconButton>

        <Logo href="/" />

        <Link href="/cart" className="relative focus-ring rounded-sm" aria-label="Shopping cart">
          <IconButton aria-label="Shopping cart">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
          </IconButton>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-action px-1 text-[10px] font-bold text-surface font-sans">
              {displayCartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
