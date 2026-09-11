import api from '../axios';
import type {
  BackendProduct,
  ProductListResponse,
  ProductQueryParams,
  CreateProductPayload,
  UpdateProductPayload,
} from '../types';

/** GET /products — paginated product list with optional search */
export async function getProductsApi(
  params?: ProductQueryParams,
): Promise<ProductListResponse> {
  const { data } = await api.get<ProductListResponse>('/products', { params });
  return data;
}

/** GET /products/:id — single product by UUID */
export async function getProductByIdApi(id: string): Promise<BackendProduct> {
  const { data } = await api.get<BackendProduct>(`/products/${id}`);
  return data;
}

/** POST /products — create a new product (requires auth) */
export async function createProductApi(
  payload: CreateProductPayload,
): Promise<BackendProduct> {
  const { data } = await api.post<BackendProduct>('/products', payload);
  return data;
}

/** PATCH /products/:id — update product fields (requires auth) */
export async function updateProductApi(
  id: string,
  payload: UpdateProductPayload,
): Promise<BackendProduct> {
  const { data } = await api.patch<BackendProduct>(`/products/${id}`, payload);
  return data;
}

/** DELETE /products/:id — remove a product (requires auth) */
export async function deleteProductApi(
  id: string,
): Promise<{ message: string }> {
  const { data } = await api.delete<{ message: string }>(`/products/${id}`);
  return data;
}
