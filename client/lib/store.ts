import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PRODUCTS, type Product } from "./data";
import type { CurrencyCode } from "./utils";

export type SortOption = "featured" | "rating" | "priceLow" | "priceHigh";

export interface FilterState {
  category: string;
  search: string;
  sort: SortOption;
  inStockOnly: boolean;
  minPrice: string;
  maxPrice: string;
  minRating: number | null;
}

export interface ToastNotification {
  id: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  image?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface StoreState {
  // Auth state
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;

  // Cart state
  cart: Record<string, number>;
  addToCart: (id: string, qty?: number) => { success: boolean; clampedQty: number };
  setQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartSubtotal: () => number;

  // Wishlist state
  wishlist: string[];
  toggleWishlist: (id: string) => boolean;
  isInWishlist: (id: string) => boolean;

  // Filter state
  filters: FilterState;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setSort: (sort: SortOption) => void;
  setInStockOnly: (inStockOnly: boolean) => void;
  setPriceRange: (min: string, max: string) => void;
  setMinRating: (rating: number | null) => void;
  clearFilters: () => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;

  // Toast notifications
  toast: ToastNotification | null;
  showToast: (toast: Omit<ToastNotification, "id">) => void;
  hideToast: () => void;

  // UI state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  filterSheetOpen: boolean;
  setFilterSheetOpen: (open: boolean) => void;
}

const initialFilters: FilterState = {
  category: "All",
  search: "",
  sort: "featured",
  inStockOnly: true,
  minPrice: "",
  maxPrice: "",
  minRating: null,
};

const defaultUser: User = {
  id: "u1",
  email: "jordan@mail.com",
  fullName: "Jordan Reyes",
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      token: "mock-jwt-token-initial",
      setAuth: (user: User, token: string) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      cart: {},
      addToCart: (id: string, qty = 1) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product || product.stock <= 0) {
          return { success: false, clampedQty: 0 };
        }
        const currentQty = get().cart[id] || 0;
        const newQty = Math.min(currentQty + qty, product.stock);
        set((state) => ({
          cart: {
            ...state.cart,
            [id]: newQty,
          },
        }));
        return { success: true, clampedQty: newQty };
      },
      setQuantity: (id: string, qty: number) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return;
        if (qty <= 0) {
          set((state) => {
            const next = { ...state.cart };
            delete next[id];
            return { cart: next };
          });
        } else {
          const clamped = Math.min(qty, product.stock);
          set((state) => ({
            cart: {
              ...state.cart,
              [id]: clamped,
            },
          }));
        }
      },
      removeFromCart: (id: string) => {
        set((state) => {
          const next = { ...state.cart };
          delete next[id];
          return { cart: next };
        });
      },
      clearCart: () => set({ cart: {} }),
      getCartCount: () => {
        return Object.values(get().cart).reduce((sum, q) => sum + q, 0);
      },
      getCartSubtotal: () => {
        return Object.entries(get().cart).reduce((sum, [id, qty]) => {
          const p = PRODUCTS.find((item) => item.id === id);
          return sum + (p ? p.price * qty : 0);
        }, 0);
      },

      wishlist: [],
      toggleWishlist: (id: string) => {
        const list = get().wishlist;
        const exists = list.includes(id);
        const next = exists ? list.filter((item) => item !== id) : [...list, id];
        set({ wishlist: next });
        return !exists;
      },
      isInWishlist: (id: string) => {
        return get().wishlist.includes(id);
      },

      filters: initialFilters,
      setCategory: (category: string) =>
        set((state) => ({ filters: { ...state.filters, category } })),
      setSearch: (search: string) =>
        set((state) => ({ filters: { ...state.filters, search } })),
      setSort: (sort: SortOption) =>
        set((state) => ({ filters: { ...state.filters, sort } })),
      setInStockOnly: (inStockOnly: boolean) =>
        set((state) => ({ filters: { ...state.filters, inStockOnly } })),
      setPriceRange: (min: string, max: string) =>
        set((state) => ({ filters: { ...state.filters, minPrice: min, maxPrice: max } })),
      setMinRating: (rating: number | null) =>
        set((state) => ({ filters: { ...state.filters, minRating: rating } })),
      clearFilters: () => set({ filters: initialFilters }),

      currency: "USD",
      setCurrency: (currency: CurrencyCode) => set({ currency }),

      toast: null,
      showToast: (t) => {
        const id = Math.random().toString(36).substring(2, 9);
        set({ toast: { ...t, id } });
      },
      hideToast: () => set({ toast: null }),

      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      filterSheetOpen: false,
      setFilterSheetOpen: (open) => set({ filterSheetOpen: open }),
    }),
    {
      name: "north-and-co-store",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        cart: state.cart,
        wishlist: state.wishlist,
        currency: state.currency,
      }),
    }
  )
);
