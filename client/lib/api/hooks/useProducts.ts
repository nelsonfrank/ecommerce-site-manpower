'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductsApi, getProductByIdApi } from '../endpoints';
import { mapBackendProduct, mapBackendProducts } from '../mappers';
import { QUERY_KEYS } from '../config';
import type { ProductQueryParams } from '../types';

// ─── Products List Query ──────────────────────────────────────────────────────

/**
 * Fetches a paginated, optionally-filtered product list from the backend.
 * Returns mapped frontend Product view models.
 */
export function useProductsQuery(params?: ProductQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.products(params as Record<string, unknown>),
    queryFn: async () => {
      const response = await getProductsApi(params);
      return {
        products: mapBackendProducts(response.data),
        meta: response.meta,
      };
    },
    staleTime: 60 * 1_000, // 1 minute
  });
}

// ─── Single Product Query ─────────────────────────────────────────────────────

/**
 * Fetches a single product by UUID. Only runs when `id` is truthy.
 */
export function useProductDetailQuery(id: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.product(id ?? ''),
    queryFn: async () => {
      const product = await getProductByIdApi(id!);
      return mapBackendProduct(product);
    },
    enabled: !!id,
    staleTime: 60 * 1_000,
  });
}
