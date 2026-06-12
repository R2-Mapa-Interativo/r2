import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  read: boolean;
}

interface OrderState {
  activeOrder: any | null;
  notifications: NotificationItem[];
  setActiveOrder: (order: any) => void;
  clearActiveOrder: () => void;
  addNotification: (notification: { title: string; description: string }) => void;
  markNotificationsRead: () => void;
  hasUnreadNotification: () => boolean;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      activeOrder: null,
      notifications: [],

      setActiveOrder: (order) => {
        set({ activeOrder: order });
      },

      clearActiveOrder: () => {
        set({ activeOrder: null });
      },

      addNotification: ({ title, description }) => {
        const item: NotificationItem = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          title,
          description,
          createdAt: Date.now(),
          read: false,
        };

        // Mais recente no topo.
        set((state) => ({ notifications: [item, ...state.notifications] }));
      },

      markNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      hasUnreadNotification: () => {
        return get().notifications.some((n) => !n.read);
      },
    }),
    {
      name: 'na_praia_active_order',
    }
  )
);
