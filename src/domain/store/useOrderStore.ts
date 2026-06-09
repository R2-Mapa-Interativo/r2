import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderState {
  activeOrder: any | null;
  setActiveOrder: (order: any) => void;
  clearActiveOrder: () => void;
  hasUnreadNotification: () => boolean;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      activeOrder: null,

      setActiveOrder: (order) => {
        set({ activeOrder: order });
      },

      clearActiveOrder: () => {
        set({ activeOrder: null });
      },

      hasUnreadNotification: () => {
        const order = get().activeOrder;
        const hasOrder = order !== null;
        
        if (!hasOrder) {
            return false;
        }

        return order.status !== 'finished';
      }
    }),
    {
      name: 'na_praia_active_order',
    }
  )
);