import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_URL } from '@/lib/api';

interface CatalogStore {
  establishments: any[];
  catalogs: Record<string, any>;
  isLoadingEstablishments: boolean;
  loadingCatalogs: Record<string, boolean>;
  fetchEstablishments: () => Promise<void>;
  fetchCatalog: (poiId: string) => Promise<void>;
}

export const useCatalogStore = create<CatalogStore>()(
  persist(
    (set, get) => ({
      establishments: [],
      catalogs: {},
      isLoadingEstablishments: false,
      loadingCatalogs: {},

      fetchEstablishments: async () => {
        set({ isLoadingEstablishments: true });

        try {
          const response = await fetch(`${API_URL}/api/establishments`);
          const isInvalid = !response.ok;
          
          if (isInvalid) {
            throw new Error("Fetch failed");
          }
          
          const data = await response.json();
          set({ establishments: data, isLoadingEstablishments: false });
        } catch (error) {
          set({ isLoadingEstablishments: false });
        }
      },

      fetchCatalog: async (poiId: string) => {
        set((state) => ({ loadingCatalogs: { ...state.loadingCatalogs, [poiId]: true } }));
        
        try {
          const response = await fetch(`${API_URL}/api/establishments/${poiId}/catalog`);
          const isInvalid = !response.ok;
          
          if (isInvalid) {
            throw new Error("Fetch failed");
          }
          
          const data = await response.json();
          
          set((state) => ({
            catalogs: { ...state.catalogs, [poiId]: data },
            loadingCatalogs: { ...state.loadingCatalogs, [poiId]: false }
          }));
        } catch (error) {
          set((state) => ({ loadingCatalogs: { ...state.loadingCatalogs, [poiId]: false } }));
        }
      }
    }),
    {
      name: 'na_praia_catalog_v2'
    }
  )
);