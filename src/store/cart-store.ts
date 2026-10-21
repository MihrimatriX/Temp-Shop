import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}

// Totals are derived from items; every action goes through this.
const withTotals = (items: CartItem[]) => ({
  items,
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce(
    (sum, i) => sum + i.product.unitPrice * i.quantity,
    0,
  ),
});

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...withTotals([]),

      addItem: (product, quantity = 1) =>
        set(({ items }) =>
          withTotals(
            items.some((i) => i.product.id === product.id)
              ? items.map((i) =>
                  i.product.id === product.id
                    ? { ...i, quantity: i.quantity + quantity }
                    : i,
                )
              : [...items, { product, quantity }],
          ),
        ),

      removeItem: (productId) =>
        set(({ items }) =>
          withTotals(items.filter((i) => i.product.id !== productId)),
        ),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set(({ items }) =>
          withTotals(
            items.map((i) =>
              i.product.id === productId ? { ...i, quantity } : i,
            ),
          ),
        );
      },

      clearCart: () => set(withTotals([])),

      getItemQuantity: (productId) =>
        get().items.find((i) => i.product.id === productId)?.quantity ?? 0,
    }),
    { name: "cart-storage" },
  ),
);
