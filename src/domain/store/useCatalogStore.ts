import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        const { establishments } = get();
        const hasCache = establishments.length > 0;
        
        if (hasCache) {
          return;
        }

        set({ isLoadingEstablishments: true });
        
        try {
          const response = await fetch("http://localhost/api/establishments");
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
        const { catalogs } = get();
        const hasCache = !!catalogs[poiId];
        
        if (hasCache) {
          return;
        }

        set((state) => ({ loadingCatalogs: { ...state.loadingCatalogs, [poiId]: true } }));
        
        try {
          const response = await fetch(`http://localhost/api/establishments/${poiId}/catalog`);
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
      name: 'na_praia_catalog'
    }
  )
);