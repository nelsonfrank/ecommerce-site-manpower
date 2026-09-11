import type { BackendOrder, BackendOrderStatus } from '../types/orders.types';
import type { Order, OrderStatus } from '@/lib/data';

/**
 * Maps a backend OrderStatus (PENDING | PROCESSING | COMPLETED | CANCELLED)
 * to the frontend display status.
 */
function mapOrderStatus(status: BackendOrderStatus): OrderStatus {
  switch (status) {
    case 'COMPLETED':
      return 'delivered';
    case 'PENDING':
    case 'PROCESSING':
      return 'in_transit';
    case 'CANCELLED':
      return 'delivered'; // treat cancelled as "closed" for UI purposes
    default:
      return 'in_transit';
  }
}

/**
 * Maps a backend Order to the frontend Order view model.
 * Converts totalAmount Decimal string → integer cents.
 */
export function mapBackendOrder(o: BackendOrder): Order {
  const totalCents = Math.round(Number(o.totalAmount) * 100);

  const date = new Date(o.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    id: o.id,
    date,
    status: mapOrderStatus(o.status),
    total: totalCents,
    items: o.items.map((item) => item.productId),
  };
}

/**
 * Maps an array of backend orders to frontend Order view models.
 */
export function mapBackendOrders(orders: BackendOrder[]): Order[] {
  return orders.map(mapBackendOrder);
}
