import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Toast } from "@/components/molecules/Toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-paper text-ink font-sans selection:bg-action-subtle selection:text-action">
      <Toast />

      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto p-4 sm:p-6 flex items-center justify-between">
        <Logo href="/" />
        <Link
          href="/"
          className="focus-ring text-xs font-semibold text-slate hover:text-ink transition-colors px-2 py-1 rounded-sm flex items-center gap-1.5"
        >
          <span>←</span> Back to store
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto p-4 sm:p-6 border-t border-mist/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate">
        <span>© 2026 North & Co. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/shop" className="hover:text-ink transition-colors">
            Shop
          </Link>
          <span className="text-mist" aria-hidden="true">·</span>
          <Link href="/account" className="hover:text-ink transition-colors">
            Help center
          </Link>
          <span className="text-mist" aria-hidden="true">·</span>
          <Link href="/" className="hover:text-ink transition-colors">
            Privacy policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
