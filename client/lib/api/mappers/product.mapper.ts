import type { BackendProduct } from '../types/products.types';
import type { Product } from '@/lib/data';

/**
 * Maps a backend product (Prisma Decimal, stockQuantity) to the frontend
 * Product view model (integer cents, stock, fallback fields).
 *
 * Fields not available on the backend (rating, reviews, oldPrice, category)
 * are given deterministic placeholders derived from the product's UUID so
 * they remain stable across re-renders.
 */
export function mapBackendProduct(p: BackendProduct): Product {
  // Convert decimal price string e.g. "349.99" → integer cents 34999
  const priceCents = Math.round(Number(p.price) * 100);

  // Derive a stable pseudo-rating from the UUID (4.0 – 5.0 range)
  const ratingSeed = parseInt(p.id.replace(/-/g, '').slice(-4), 16);
  const rating = Number((4.0 + (ratingSeed % 100) / 100).toFixed(1));

  // Derive a stable review count
  const reviews = 10 + (ratingSeed % 290);

  return {
    id: p.id,
    name: p.name,
    price: priceCents,
    stock: p.stockQuantity,
    rating,
    reviews,
    // Backend has no category field — default to "Home"
    category: 'Home' as Product['category'],
    desc: p.description ?? '',
    img:
      p.image ??
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
  };
}

/**
 * Maps an array of backend products to frontend Product view models.
 */
export function mapBackendProducts(products: BackendProduct[]): Product[] {
  return products.map(mapBackendProduct);
}
