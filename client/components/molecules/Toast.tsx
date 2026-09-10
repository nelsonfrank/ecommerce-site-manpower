"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export interface ToastProps {
  duration?: number; // ms
}

export function Toast({ duration = 3800 }: ToastProps) {
  const toast = useStore((state) => state.toast);
  const hideToast = useStore((state) => state.hideToast);

  React.useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, duration, hideToast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "toast-animate fixed z-[200] right-6 bottom-6 md:bottom-6 xs:bottom-20 max-md:bottom-20 max-xs:left-4 max-xs:right-4 max-xs:bottom-20 max-w-[380px] bg-ink text-surface p-3.5 rounded-md shadow-card flex items-center gap-3 border border-slate/30"
      )}
    >
      {toast.image ? (
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm bg-surface p-1 border border-mist">
          <Image
            src={toast.image}
            alt=""
            fill
            sizes="44px"
            className="object-contain"
          />
        </div>
      ) : (
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-bg text-success text-base font-bold"
          aria-hidden="true"
        >
          ✓
        </span>
      )}

      <span className="flex-1 text-sm font-sans leading-snug text-surface">
        {toast.message}
      </span>

      {toast.actionLabel && toast.actionHref && (
        <Link
          href={toast.actionHref}
          onClick={() => hideToast()}
          className="focus-ring shrink-0 rounded bg-white/15 px-2.5 py-1.5 text-xs font-semibold text-surface hover:bg-white/25 transition-colors whitespace-nowrap"
        >
          {toast.actionLabel}
        </Link>
      )}

      <button
        type="button"
        onClick={() => hideToast()}
        aria-label="Dismiss notification"
        className="focus-ring text-surface/60 hover:text-surface text-sm p-1"
      >
        ✕
      </button>
    </div>
  );
}
