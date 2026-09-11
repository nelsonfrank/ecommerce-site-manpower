'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/lib/store';
import {
  getCartApi,
  addToCartApi,
  updateCartItemApi,
  removeFromCartApi,
} from '../endpoints';
import { QUERY_KEYS } from '../config';
import type { AddToCartPayload, UpdateCartItemPayload } from '../types';

// ─── Cart Query ───────────────────────────────────────────────────────────────

/**
 * Fetches the authenticated user's cart from the backend.
 * Only runs when a token is present.
 */
export function useCartQuery() {
  const token = useStore((s) => s.accessToken);

  return useQuery({
    queryKey: QUERY_KEYS.cart,
    queryFn: getCartApi,
    enabled: !!token,
    staleTime: 30 * 1_000, // 30 seconds
  });
}

// ─── Add To Cart Mutation ─────────────────────────────────────────────────────

export function useAddToCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => addToCartApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart });
    },
  });
}

// ─── Update Cart Item Mutation ────────────────────────────────────────────────

export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartItemId,
      payload,
    }: {
      cartItemId: string;
      payload: UpdateCartItemPayload;
    }) => updateCartItemApi(cartItemId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart });
    },
  });
}

// ─── Remove From Cart Mutation ────────────────────────────────────────────────

export function useRemoveFromCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) => removeFromCartApi(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart });
    },
  });
}
