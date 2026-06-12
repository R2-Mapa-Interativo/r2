import { create } from 'zustand';
import { GraphNode } from '@/domain/models/types';
import { API_URL } from '@/lib/api';

interface MapNodeData extends GraphNode {
  type: string;
  name?: string;
}

interface MapStore {
  nodes: MapNodeData[];
  isLoading: boolean;
  error: boolean;
  fetchNodes: () => Promise<void>;
}

export const useMapStore = create<MapStore>((set, get) => ({
  nodes: [],
  isLoading: true,
  error: false,
  fetchNodes: async () => {
    const hasNodes = get().nodes.length > 0;
    if (hasNodes) {
        set({ isLoading: false });
        return;
    }

    set({ isLoading: true, error: false });

    try {
      const response = await fetch(`${API_URL}/api/map/nodes`);
      const isInvalid = !response.ok;

      if (isInvalid) {
          throw new Error('HTTP error');
      }

      const payload = await response.json();

      if (payload.success && payload.data) {
        set({ nodes: payload.data, isLoading: false, error: false });
        return;
      }

      throw new Error('Invalid payload');
    } catch (error) {
      set({ isLoading: false, error: true });
    }
  },
}));