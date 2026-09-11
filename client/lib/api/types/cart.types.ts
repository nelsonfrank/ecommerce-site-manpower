import type { BackendProduct } from './products.types';

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface BackendCartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  /** Computed by cart service — price * quantity */
  subtotal: number;
  product: BackendProduct;
  createdAt: string;
  updatedAt: string;
}

export interface BackendCart {
  id: string;
  userId: string;
  items: BackendCartItem[];
  /** Sum of all subtotals */
  total: number;
  /** Sum of all quantities */
  totalItems: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}
