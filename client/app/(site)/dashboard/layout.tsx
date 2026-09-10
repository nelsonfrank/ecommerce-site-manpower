"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { DashboardSidebar } from "@/components/organisms/DashboardSidebar";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { Button } from "@/components/ui/Button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useStore((state) => state.user);
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  // Protected route check
  React.useEffect(() => {
    if (hasMounted && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [hasMounted, user, pathname, router]);

  // Loading state while checking local storage hydration
  if (!hasMounted) {
    return (
      <div className="py-16 text-center text-slate">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-action border-t-transparent mb-3" />
        <p className="text-sm font-sans">Loading your dashboard…</p>
      </div>
    );
  }

  // Not logged in fallback view if redirect is in progress
  if (!user) {
    return (
      <div className="py-16 max-w-md mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-warning-bg text-warning text-2xl font-bold flex items-center justify-center mx-auto">
          🔒
        </div>
        <h1 className="font-display font-semibold text-2xl text-ink">
          Protected Dashboard
        </h1>
        <p className="font-sans text-sm text-slate">
          Please sign in to access your personal dashboard and saved details.
        </p>
        <div className="pt-2">
          <Button onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname)}`)}>
            Sign in to continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />

      {/* Main 2-Column Shell */}
      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] lg:grid-cols-[260px_1fr] gap-6 md:gap-8 items-start">
        {/* Persistent Dashboard Sidebar */}
        <DashboardSidebar className="md:sticky md:top-24 md:self-start w-full" />

        {/* Dynamic Child Page Content */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
