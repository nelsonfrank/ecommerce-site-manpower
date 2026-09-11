// ─── Product Types ────────────────────────────────────────────────────────────

export interface BackendProduct {
  id: string;
  name: string;
  description: string | null;
  /** Prisma Decimal serialised as a string e.g. "349.99" */
  price: string;
  stockQuantity: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProductListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductListResponse {
  data: BackendProduct[];
  meta: ProductListMeta;
}

// ─── Create / Update DTOs ─────────────────────────────────────────────────────

export interface CreateProductPayload {
  name: string;
  description?: string;
  /** Numeric price e.g. 349.99 */
  price: number;
  stockQuantity: number;
  image?: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
