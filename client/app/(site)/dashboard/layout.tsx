"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/organisms/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="space-y-6">
      <h1 className="font-display font-semibold text-[32px] tracking-[-0.04em] text-ink leading-tight">
        Account
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-7 items-start">
        {/* Persistent Dashboard Sidebar inspired by /account */}
        <DashboardSidebar className="w-full" />

        {/* Dynamic Child Page Content */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
