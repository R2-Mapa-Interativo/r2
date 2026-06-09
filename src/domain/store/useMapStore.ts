import { create } from 'zustand';
import { GraphNode } from '@/domain/models/types';

interface MapNodeData extends GraphNode {
  type: string;
  name?: string;
}

interface MapStore {
  nodes: MapNodeData[];
  isLoading: boolean;
  fetchNodes: () => Promise<void>;
}

export const useMapStore = create<MapStore>((set, get) => ({
  nodes: [],
  isLoading: true,
  fetchNodes: async () => {
    const hasNodes = get().nodes.length > 0;
    if (hasNodes) {
        set({ isLoading: false });
        return;
    }

    try {
      const response = await fetch('http://localhost/api/map/nodes');
      const isInvalid = !response.ok;
      
      if (isInvalid) {
          throw new Error('HTTP error');
      }
      
      const payload = await response.json();
      
      if (payload.success && payload.data) {
        set({ nodes: payload.data, isLoading: false });
        return;
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));