import api from '../axios';
import type {
  BackendCart,
  BackendCartItem,
  AddToCartPayload,
  UpdateCartItemPayload,
} from '../types';

/** GET /cart — returns current authenticated user's cart with computed totals */
export async function getCartApi(): Promise<BackendCart> {
  const { data } = await api.get<BackendCart>('/cart');
  return data;
}

/** POST /cart — adds a product to the cart (or increments quantity) */
export async function addToCartApi(
  payload: AddToCartPayload,
): Promise<BackendCartItem> {
  const { data } = await api.post<BackendCartItem>('/cart', payload);
  return data;
}

/** PATCH /cart/:id — updates quantity of a specific cart item by cartItemId */
export async function updateCartItemApi(
  cartItemId: string,
  payload: UpdateCartItemPayload,
): Promise<BackendCartItem> {
  const { data } = await api.patch<BackendCartItem>(
    `/cart/${cartItemId}`,
    payload,
  );
  return data;
}

/** DELETE /cart/:id — removes a specific cart item by cartItemId */
export async function removeFromCartApi(
  cartItemId: string,
): Promise<{ message: string }> {
  const { data } = await api.delete<{ message: string }>(
    `/cart/${cartItemId}`,
  );
  return data;
}
