"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { QUERY_STALE_TIME } from "@/lib/api/config";
import { useStore } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const token = useStore((state) => state.accessToken);

  useEffect(() => {
    if (token) {
      document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`;
    } else {
      document.cookie = `auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }, [token]);

  // Create a stable QueryClient per-browser session (not per render).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
