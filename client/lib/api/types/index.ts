export type * from './auth.types';
export type * from './products.types';
export type * from './cart.types';
export type * from './orders.types';

// ─── Shared / Generic Types ───────────────────────────────────────────────────

/** Unified error shape returned by NestJS HttpExceptionFilter */
export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}
