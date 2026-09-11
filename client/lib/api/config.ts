/** Base API URL — defaults to localhost:8080 in development */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

/** Default Axios request timeout in milliseconds */
export const API_TIMEOUT = 15_000;

/** Query cache stale time in milliseconds (1 minute) */
export const QUERY_STALE_TIME = 60 * 1_000;

/** React Query cache keys — centralised to prevent typos across hooks */
export const QUERY_KEYS = {
  profile: ['profile'] as const,
  products: (params?: Record<string, unknown>) =>
    params ? (['products', params] as const) : (['products'] as const),
  product: (id: string) => ['products', id] as const,
  cart: ['cart'] as const,
  orders: ['orders'] as const,
  order: (id: string) => ['orders', id] as const,
} as const;
