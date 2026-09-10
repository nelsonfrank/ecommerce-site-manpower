export type ProductCategory = "Bags" | "Kitchen" | "Home" | "Stationery";

export interface Product {
  id: string;
  name: string;
  price: number; // integer cents
  oldPrice?: number; // integer cents
  stock: number;
  rating: number;
  reviews: number;
  category: ProductCategory;
  desc: string;
  img: string;
}

export type OrderStatus = "delivered" | "in_transit";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number; // integer cents
  items: string[]; // product IDs
}

export const CATEGORIES: ProductCategory[] = [
  "Bags",
  "Kitchen",
  "Home",
  "Stationery",
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Everyday Tote",
    price: 4800,
    oldPrice: 6000,
    stock: 12,
    rating: 4.8,
    reviews: 124,
    category: "Bags",
    desc: "A canvas tote sized for groceries and daily carry. Reinforced straps and a flat base so it stands on its own.",
    img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800",
  },
  {
    id: "p2",
    name: "Ceramic Mug",
    price: 1800,
    stock: 2,
    rating: 4.6,
    reviews: 86,
    category: "Kitchen",
    desc: "Stoneware mug, 12oz. Microwave and dishwasher safe with a matte exterior and gloss interior.",
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
  },
  {
    id: "p3",
    name: "Desk Lamp",
    price: 6200,
    stock: 0,
    rating: 4.9,
    reviews: 51,
    category: "Home",
    desc: "Adjustable arm with warm/cool dimming. USB-C powered.",
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
  },
  {
    id: "p4",
    name: "Notebook Set",
    price: 2200,
    stock: 30,
    rating: 4.7,
    reviews: 203,
    category: "Stationery",
    desc: "Three dot-grid notebooks, 160 pages each. Stitched binding lies flat.",
    img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800",
  },
  {
    id: "p5",
    name: "Wool Throw",
    price: 8900,
    oldPrice: 10500,
    stock: 5,
    rating: 4.9,
    reviews: 39,
    category: "Home",
    desc: "Lambswool throw woven in a small mill. 50 × 60 in.",
    img: "https://images.unsplash.com/photo-1580301762395-83aa0d582c15?w=800",
  },
  {
    id: "p6",
    name: "Steel Water Bottle",
    price: 2800,
    stock: 18,
    rating: 4.8,
    reviews: 318,
    category: "Kitchen",
    desc: "Insulated 24oz bottle that keeps drinks cold for 24 hours. Leakproof cap.",
    img: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800",
  },
];

export const ORDERS: Order[] = [
  {
    id: "1042",
    date: "Sep 2, 2026",
    status: "delivered",
    total: 6600,
    items: ["p1", "p4"],
  },
  {
    id: "1038",
    date: "Aug 27, 2026",
    status: "in_transit",
    total: 8900,
    items: ["p5"],
  },
  {
    id: "1031",
    date: "Aug 14, 2026",
    status: "delivered",
    total: 2800,
    items: ["p6"],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getOrderById(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id);
}
