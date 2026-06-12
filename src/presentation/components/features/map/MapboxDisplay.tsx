import Map, { Source, Layer, Marker, GeolocateControl } from "react-map-gl/mapbox";
import { Navigation, Store, Toilet } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { GraphNode } from "@/domain/models/types";
import { useSmoothRoute } from "@/presentation/hooks/useSmoothRoute";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapboxDisplayProps {
  isFetchingRoute: boolean;
  isLoadingNodes: boolean;
  loadError: boolean;
  onRetry: () => void;
  route: GraphNode[];
  currentNode: any;
  bathrooms: any[];
  restaurants: any[];
  targetBathroomId: string | null;
  selectedRestaurantId: string | null;
  restaurantImages: Record<string, string>;
  viewState: any;
  onViewStateChange: (evt: any) => void;
  onSelectBathroom: (id: string) => void;
  onSelectRestaurant: (id: string) => void;
}

export const MapboxDisplay = ({
  isFetchingRoute,
  isLoadingNodes,
  loadError,
  onRetry,
  route,
  currentNode,
  bathrooms,
  restaurants,
  targetBathroomId,
  selectedRestaurantId,
  restaurantImages,
  viewState,
  onViewStateChange,
  onSelectBathroom,
  onSelectRestaurant
}: MapboxDisplayProps) => {
  
  const routeGeoJSON = useSmoothRoute(route);

  return (
    <section className="relative z-10 mt-7 flex-1 min-h-[400px] w-full rounded-[18px] bg-[#F8F8F8] shadow-2xl">
      {isLoadingNodes && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end overflow-hidden rounded-[14px] bg-neutral-900">
          <div className="h-full w-full animate-pulse bg-neutral-800" />
        </div>
      )}

      <div className={`absolute top-2 left-2 right-2 bottom-2 overflow-hidden rounded-[14px] bg-neutral-900 transition-opacity duration-300 ${isFetchingRoute ? 'opacity-70' : 'opacity-100'}`}>
        
        {isLoadingNodes && (
          <div className="absolute inset-0 z-20 bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#f4f36f] border-t-transparent" />
              <span className="text-[#f4f36f] font-bold text-xs uppercase tracking-widest animate-pulse">
                Sincronizando Mapa...
              </span>
            </div>
          </div>
        )}

        {loadError && !isLoadingNodes && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-neutral-900/95 p-6 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-sm font-bold text-white">Não foi possível carregar o mapa.</span>
              <span className="text-xs text-neutral-400">Verifique sua conexão e tente novamente.</span>
              <button
                type="button"
                onClick={onRetry}
                className="rounded-full bg-[#f4f36f] px-5 py-2 text-xs font-black uppercase tracking-widest text-[#061862] shadow-lg transition-transform hover:scale-105"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <Map
          {...viewState}
          onMove={onViewStateChange}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}
        >
          <GeolocateControl 
            position="top-right" 
            trackUserLocation 
            showUserHeading 
            showAccuracyCircle={false} 
          />

          {routeGeoJSON && (
            <Source id="route-source" type="geojson" data={routeGeoJSON as any}>
              <Layer 
                id="route-layer-glow" 
                type="line" 
                layout={{ "line-join": "round", "line-cap": "round" }} 
                paint={{ "line-color": "#059669", "line-width": 12, "line-opacity": 0.3 }} 
              />
              <Layer 
                id="route-layer" 
                type="line" 
                layout={{ "line-join": "round", "line-cap": "round" }} 
                paint={{ "line-color": "#10B981", "line-width": 5, "line-dasharray": [1, 2] }} 
              />
            </Source>
          )}

          {currentNode && (
            <Marker longitude={Number(currentNode.lng)} latitude={Number(currentNode.lat)} anchor="center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f36f] text-[#061862] shadow-lg ring-4 ring-white/80 transition-transform duration-300">
                <Navigation size={18} strokeWidth={3} />
              </div>
            </Marker>
          )}

          {!isLoadingNodes && bathrooms.map((b) => {
            const active = b.id === targetBathroomId;
            const isFemale = b.id.includes('fem');
            const isMale = b.id.includes('masc');
            const isFull = b.is_full;

            let genderColor = 'text-[#061862]';
            if (isFemale) {
                genderColor = 'text-pink-600';
            }
            if (isMale) {
                genderColor = 'text-blue-600';
            }

            return (
              <Marker key={b.id} longitude={Number(b.lng)} latitude={Number(b.lat)} anchor="bottom">
                <div className="flex flex-col items-center">
                  {active && (
                    <div className="mb-2 rounded-[10px] bg-white px-3 py-2 text-xs font-black text-[#061862] shadow-lg whitespace-nowrap animate-in zoom-in duration-300">
                      {b.name || b.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  )}
                  {isFull && !active && (
                    <div className="mb-1 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-md">
                      Cheio
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onSelectBathroom(b.id); }}
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 ${active ? "ring-4 ring-[#f4f36f] scale-110" : ""} ${genderColor}`}
                  >
                    <Toilet size={16} strokeWidth={3} />
                    {isFemale && (
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-100 text-[9px] font-black text-pink-600 shadow-sm ring-1 ring-white">F</span>
                    )}
                    {isMale && (
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[9px] font-black text-blue-600 shadow-sm ring-1 ring-white">M</span>
                    )}
                  </button>
                </div>
              </Marker>
            );
          })}

          {!isLoadingNodes && restaurants.map((restaurant) => {
            const active = restaurant.id === selectedRestaurantId;
            const image = restaurantImages[restaurant.id];
            return (
              <Marker key={restaurant.id} longitude={Number(restaurant.lng)} latitude={Number(restaurant.lat)} anchor="center">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onSelectRestaurant(restaurant.id); }}
                  className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-[#823612] shadow-lg ring-2 ring-white transition-transform duration-300 hover:scale-105 ${active ? "ring-4 ring-[#f4f36f] scale-110" : ""}`}
                >
                  {image ? (
                    <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <Store size={16} strokeWidth={3} />
                  )}
                </button>
              </Marker>
            );
          })}
        </Map>
      </div>
    </section>
  );
};