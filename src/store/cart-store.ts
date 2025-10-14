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
  totalAmount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalAmount: 0,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return {
              items: updatedItems,
              totalItems: updatedItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              ),
              totalPrice: updatedItems.reduce(
                (sum, item) => sum + item.product.unitPrice * item.quantity,
                0
              ),
              totalAmount: updatedItems.reduce(
                (sum, item) => sum + item.product.unitPrice * item.quantity,
                0
              ),
            };
          } else {
            const newItems = [...state.items, { product, quantity }];
            return {
              items: newItems,
              totalItems: newItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              ),
              totalPrice: newItems.reduce(
                (sum, item) => sum + item.product.unitPrice * item.quantity,
                0
              ),
              totalAmount: newItems.reduce(
                (sum, item) => sum + item.product.unitPrice * item.quantity,
                0
              ),
            };
          }
        });
      },

      removeItem: (productId: number) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.product.id !== productId
          );
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.product.unitPrice * item.quantity,
              0
            ),
            totalAmount: updatedItems.reduce(
              (sum, item) => sum + item.product.unitPrice * item.quantity,
              0
            ),
          };
        });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.product.unitPrice * item.quantity,
              0
            ),
            totalAmount: updatedItems.reduce(
              (sum, item) => sum + item.product.unitPrice * item.quantity,
              0
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0, totalAmount: 0 });
      },

      getItemQuantity: (productId: number) => {
        const item = get().items.find((item) => item.product.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
