'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/lib/store';
import { checkoutApi, getOrdersApi, getOrderByIdApi } from '../endpoints';
import { mapBackendOrder } from '../mappers';
import { QUERY_KEYS } from '../config';

// ─── Orders List Query ────────────────────────────────────────────────────────

/**
 * Fetches all orders placed by the current authenticated user.
 * Returns mapped frontend Order view models.
 */
export function useOrdersQuery() {
  const token = useStore((s) => s.accessToken);

  return useQuery({
    queryKey: QUERY_KEYS.orders,
    queryFn: getOrdersApi,
    enabled: !!token,
    staleTime: 60 * 1_000,
  });
}

// ─── Order Detail Query ───────────────────────────────────────────────────────

/**
 * Fetches a single order by UUID. Returns both the raw BackendOrder (for
 * price snapshots) and a mapped frontend Order.
 */
export function useOrderDetailQuery(id: string | undefined) {
  const token = useStore((s) => s.accessToken);

  return useQuery({
    queryKey: QUERY_KEYS.order(id ?? ''),
    queryFn: async () => {
      const order = await getOrderByIdApi(id!);
      return {
        raw: order,
        mapped: mapBackendOrder(order),
      };
    },
    enabled: !!id && !!token,
    staleTime: 60 * 1_000,
  });
}

// ─── Checkout Mutation ────────────────────────────────────────────────────────

/**
 * Calls POST /orders to atomically checkout the current cart.
 * On success, invalidates both cart and orders caches.
 */
export function useCheckoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutApi,
    onSuccess: () => {
      // Cart is now empty on the backend
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart });
      // Orders list now includes the new order
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders });
    },
  });
}
