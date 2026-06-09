import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  establishmentId: string | null;
  items: CartItem[];
  addItem: (establishmentId: string, item: CartItem) => void;
  clearAndAddItem: (establishmentId: string, item: CartItem) => void;
  removeItem: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      establishmentId: null,
      items: [],

      addItem: (establishmentId, item) => {
        const state = get();
        const isDifferentEstablishment = state.establishmentId !== null && String(state.establishmentId) !== String(establishmentId);

        if (isDifferentEstablishment) {
          return;
        }

        const existingItemIndex = state.items.findIndex(i => i.productId === item.productId);
        const isExisting = existingItemIndex >= 0;

        if (isExisting) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += item.quantity;
          set({ items: newItems });
          return;
        }

        set({
          establishmentId,
          items: [...state.items, item]
        });
      },

      clearAndAddItem: (establishmentId, item) => {
        set({
          establishmentId,
          items: [item]
        });
      },

      removeItem: (productId) => {
        set(state => ({
          items: state.items.filter(i => i.productId !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        const isValidQuantity = quantity > 0;
        if (!isValidQuantity) {
          get().removeItem(productId);
          return;
        }

        set(state => ({
          items: state.items.map(i => {
            const isTarget = i.productId === productId;
            if (isTarget) {
              return { ...i, quantity };
            }
            return i;
          })
        }));
      },

      clearCart: () => {
        set({ establishmentId: null, items: [] });
      },

      getTotal: () => {
        return get().items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      }
    }),
    {
      name: 'na_praia_cart',
    }
  )
);