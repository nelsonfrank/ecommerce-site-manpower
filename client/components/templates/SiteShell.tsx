"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { MobileDrawer } from "@/components/organisms/MobileDrawer";
import { MobileBottomNav } from "@/components/organisms/MobileBottomNav";
import { FilterSheet } from "@/components/organisms/FilterSheet";
import { Toast } from "@/components/molecules/Toast";

export interface SiteShellProps {
  children: React.ReactNode;
  className?: string;
}

export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-action-subtle selection:text-action">
      <SiteHeader />
      <MobileDrawer />
      <FilterSheet />
      <Toast />

      <main
        className={cn(
          "flex-1 w-full max-w-[1280px] mx-auto px-4 xs:px-5 md:px-6 py-6 md:py-8 pb-24 md:pb-20",
          className
        )}
      >
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
}
