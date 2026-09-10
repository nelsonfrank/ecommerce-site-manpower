"use client";

import * as React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import type { CurrencyCode } from "@/lib/utils";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { AccountNav } from "@/components/organisms/AccountNav";
import { ProfileHeader } from "@/components/organisms/ProfileHeader";
import { AccountLayout } from "@/components/templates/AccountLayout";

export default function AccountPage() {
  const user = useStore((state) => state.user);
  const currency = useStore((state) => state.currency);
  const setCurrency = useStore((state) => state.setCurrency);
  const showToast = useStore((state) => state.showToast);

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    showToast({
      message: `Store currency changed to ${newCurrency}`,
    });
  };

  const displayName = user?.fullName || "Guest Customer";
  const displayEmail = user?.email || "Not signed in";

  return (
    <div className="space-y-6">
      <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
        Account
      </h1>

      <AccountLayout
        nav={<AccountNav />}
        content={
          <div className="rounded-md border border-mist bg-surface p-5 md:p-6 shadow-sm space-y-6">
            <ProfileHeader
              name={displayName}
              email={displayEmail}
              memberSince={user ? "Member since Jan 2025" : "Browsing as guest"}
              initials={
                user
                  ? undefined
                  : "GU"
              }
              onEdit={() =>
                showToast({ message: "Profile edit modal opened." })
              }
            />

            {!user && (
              <div className="rounded-sm bg-action-subtle p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-sm">
                  <strong className="text-ink block font-semibold">Sign in to North & Co.</strong>
                  <span className="text-slate text-xs">Save your default addresses, manage orders, and sync your wishlist.</span>
                </div>
                <Link href="/login" className="focus-ring shrink-0 rounded-sm">
                  <Button size="sm">Sign in</Button>
                </Link>
              </div>
            )}

            <div className="divide-y divide-mist text-sm">
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <strong className="text-ink font-semibold">Full name</strong>
                <span className="text-slate">{displayName}</span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <strong className="text-ink font-semibold">Email</strong>
                <span className="text-slate">{displayEmail}</span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <strong className="text-ink font-semibold">Default address</strong>
                <span className="text-slate">12 Main St, Springfield</span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <strong className="text-ink font-semibold">Default payment</strong>
                <span className="text-slate">Visa ending 4242</span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <strong className="text-ink font-semibold block">Currency</strong>
                  <span className="text-xs text-slate font-normal">
                    Re-formats all product and checkout amounts sitewide
                  </span>
                </div>
                <div className="w-36">
                  <Select
                    value={currency}
                    onChange={(e) =>
                      handleCurrencyChange(e.target.value as CurrencyCode)
                    }
                    aria-label="Select store currency"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="TZS">TZS (TSh)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="KES">KES (KSh)</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
