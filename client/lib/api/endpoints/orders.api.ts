import api from '../axios';
import type { BackendOrder } from '../types';

/** POST /orders — atomically checkouts the current cart into a placed order */
export async function checkoutApi(): Promise<BackendOrder> {
  const { data } = await api.post<BackendOrder>('/orders');
  return data;
}

/** GET /orders — returns all orders placed by the current authenticated user */
export async function getOrdersApi(): Promise<BackendOrder[]> {
  const { data } = await api.get<BackendOrder[]>('/orders');
  return data;
}

/** GET /orders/:id — returns a specific order with full item details */
export async function getOrderByIdApi(id: string): Promise<BackendOrder> {
  const { data } = await api.get<BackendOrder>(`/orders/${id}`);
  return data;
}
