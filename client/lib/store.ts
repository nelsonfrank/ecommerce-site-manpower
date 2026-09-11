import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
  /** @deprecated Use accessToken */
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;

  // Local cart — used for guest users and as optimistic UI cache for authenticated users.
  // productId → quantity
  cart: Record<string, number>;
  addToCart: (id: string, qty?: number, stock?: number) => { success: boolean; clampedQty: number };
  setQuantity: (id: string, qty: number, stock?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartCount: () => number;

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

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // ── Auth ──────────────────────────────────────────────────────────────
      user: null,
      token: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (user: User, accessToken: string, refreshToken: string) =>
        set({ user, accessToken, refreshToken, token: accessToken }),
      logout: () =>
        set({ user: null, accessToken: null, refreshToken: null, token: null, cart: {} }),

      // ── Local Cart ────────────────────────────────────────────────────────
      // stock parameter is supplied by the caller (from backend product data).
      // Falls back to a large number so the caller can still add without stock.
      cart: {},
      addToCart: (id: string, qty = 1, stock = 9999) => {
        if (stock <= 0) return { success: false, clampedQty: 0 };
        const currentQty = get().cart[id] || 0;
        const newQty = Math.min(currentQty + qty, stock);
        set((state) => ({ cart: { ...state.cart, [id]: newQty } }));
        return { success: true, clampedQty: newQty };
      },
      setQuantity: (id: string, qty: number, stock = 9999) => {
        if (qty <= 0) {
          set((state) => {
            const next = { ...state.cart };
            delete next[id];
            return { cart: next };
          });
        } else {
          const clamped = Math.min(qty, stock);
          set((state) => ({ cart: { ...state.cart, [id]: clamped } }));
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
      getCartCount: () =>
        Object.values(get().cart).reduce((sum, q) => sum + q, 0),

      // ── Wishlist ──────────────────────────────────────────────────────────
      wishlist: [],
      toggleWishlist: (id: string) => {
        const list = get().wishlist;
        const exists = list.includes(id);
        const next = exists ? list.filter((item) => item !== id) : [...list, id];
        set({ wishlist: next });
        return !exists;
      },
      isInWishlist: (id: string) => get().wishlist.includes(id),

      // ── Filters ───────────────────────────────────────────────────────────
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

      // ── Currency ──────────────────────────────────────────────────────────
      currency: "USD",
      setCurrency: (currency: CurrencyCode) => set({ currency }),

      // ── Toast ─────────────────────────────────────────────────────────────
      toast: null,
      showToast: (t) => {
        const id = Math.random().toString(36).substring(2, 9);
        set({ toast: { ...t, id } });
      },
      hideToast: () => set({ toast: null }),

      // ── UI ────────────────────────────────────────────────────────────────
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      filterSheetOpen: false,
      setFilterSheetOpen: (open) => set({ filterSheetOpen: open }),
    }),
    {
      name: "north-and-co-store",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({
        user: state.user,
        token: state.accessToken,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        cart: state.cart,
        wishlist: state.wishlist,
        currency: state.currency,
      }),
    }
  )
);
