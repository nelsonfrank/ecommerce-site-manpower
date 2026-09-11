import type { BackendProduct } from './products.types';

// ─── Order Types ──────────────────────────────────────────────────────────────

/** Mirrors the backend Prisma OrderStatus enum */
export type BackendOrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface BackendOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  /** Prisma Decimal serialised as a string — price snapshot at checkout */
  priceAtPurchase: string;
  product: BackendProduct;
}

export interface BackendOrder {
  id: string;
  userId: string;
  /** Prisma Decimal serialised as a string */
  totalAmount: string;
  status: BackendOrderStatus;
  items: BackendOrderItem[];
  createdAt: string;
  updatedAt: string;
}
