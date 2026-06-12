import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMapStore } from "@/domain/store/useMapStore";
import { useCatalogStore } from "@/domain/store/useCatalogStore";
import { useMapRouting } from "@/presentation/hooks/useMapRouting";
import { useMapEntities } from "@/domain/entities/useMapEntities";
import { useMapCamera } from "@/presentation/hooks/useMapCamera";
import { MapAlert } from "@/presentation/components/features/map/MapAlert";
import { MapHeader } from "@/presentation/components/features/map/MapHeader";
import { MapBottomCards } from "@/presentation/components/features/map/MapBottomCards";
import { MapboxDisplay } from "@/presentation/components/features/map/MapboxDisplay";
import { MapBackground } from "@/presentation/components/features/map/MapBackground";
import { MapTitle } from "@/presentation/components/features/map/MapTitle";

const InteractiveMap = () => {
  const [searchParams] = useSearchParams();
  const initialRestaurantId = searchParams.get("restaurant");

  const { nodes: databaseNodes, isLoading: nodesLoading, error: nodesError, fetchNodes } = useMapStore();
  const { establishments, fetchEstablishments } = useCatalogStore();

  const [isBathroomSelected, setIsBathroomSelected] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(initialRestaurantId);
  const [targetBathroomId, setTargetBathroomId] = useState<string | null>(null);

  const {
    restaurants,
    bathrooms,
    currentNode,
    closestBathroomId,
    activeBathroomName,
    selectedRestaurant
  } = useMapEntities(databaseNodes, targetBathroomId, selectedRestaurantId);

  const {
    route,
    isFetchingRoute,
    redirectAlert,
    setRedirectAlert,
    fetchRoute,
    clearRoute
  } = useMapRouting();

  const { viewState, handleViewStateChange, resetCamera } = useMapCamera(-47.850007, -15.818030);

  useEffect(() => {
    fetchNodes();
  }, [fetchNodes]);

  useEffect(() => {
    fetchEstablishments();
  }, [fetchEstablishments]);

  // Cruza os nós do mapa com os estabelecimentos (por zapt_poi_id) para a mini imagem no ponto.
  const restaurantImages = useMemo(() => {
    const map: Record<string, string> = {};
    establishments.forEach((e: any) => {
      if (e.zapt_poi_id && e.image_url) {
        map[e.zapt_poi_id] = e.image_url;
      }
    });
    return map;
  }, [establishments]);

  useEffect(() => {
    const isInvalidInitial = initialRestaurantId && restaurants.length > 0 && !restaurants.some(r => r.id === initialRestaurantId);
    isInvalidInitial && setSelectedRestaurantId(null);
  }, [initialRestaurantId, restaurants]);

  useEffect(() => {
    const isReadyForRestaurant = !isBathroomSelected && selectedRestaurantId;
    isReadyForRestaurant && fetchRoute("current", selectedRestaurantId, bathrooms, setTargetBathroomId);

    const isReadyForBathroom = isBathroomSelected && targetBathroomId;
    isReadyForBathroom && fetchRoute("current", targetBathroomId, bathrooms, setTargetBathroomId);

    const isEmpty = !isBathroomSelected && !selectedRestaurantId;
    isEmpty && clearRoute();
  }, [selectedRestaurantId, isBathroomSelected, targetBathroomId, bathrooms, fetchRoute, clearRoute]);

  const clearRedirectAlert = () => setRedirectAlert({ show: false, original: "", new: "" });

  const handleLocateFixed = () => {
    setIsBathroomSelected(false);
    setSelectedRestaurantId(null);
    setTargetBathroomId(null);
    clearRedirectAlert();
    resetCamera(-47.850007, -15.818030);
  };

  const handleSelectBathroom = (id: string) => {
    setIsBathroomSelected(true);
    setSelectedRestaurantId(null);
    setTargetBathroomId(id);
    clearRedirectAlert();
  };

  const handleSelectRestaurant = (id: string) => {
    setSelectedRestaurantId(id);
    setIsBathroomSelected(false);
    setTargetBathroomId(null);
    clearRedirectAlert();
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto min-h-screen max-w-[720px] overflow-hidden bg-black flex flex-col relative">
        <MapAlert
          show={redirectAlert.show}
          original={redirectAlert.original}
          newDest={redirectAlert.new}
          onClose={() => setRedirectAlert(prev => ({ ...prev, show: false }))}
        />

        <section className="relative flex-1 flex flex-col overflow-hidden bg-[linear-gradient(180deg,#15346F_0%,#2767A1_42%,#0E315E_70%,#020202_100%)] px-[clamp(20px,5.4vw,39px)] pb-[clamp(30px,7vw,50px)] pt-[clamp(28px,6.4vw,46px)]">
          <MapBackground />
          <MapHeader onLocate={handleLocateFixed} />
          <MapTitle />

          <MapboxDisplay
            isFetchingRoute={isFetchingRoute}
            isLoadingNodes={nodesLoading}
            loadError={nodesError}
            onRetry={fetchNodes}
            route={route}
            currentNode={currentNode}
            bathrooms={bathrooms}
            restaurants={restaurants}
            targetBathroomId={targetBathroomId}
            selectedRestaurantId={selectedRestaurantId}
            restaurantImages={restaurantImages}
            viewState={viewState}
            onViewStateChange={handleViewStateChange}
            onSelectBathroom={handleSelectBathroom}
            onSelectRestaurant={handleSelectRestaurant}
          />

          <MapBottomCards
            bathroomSelected={isBathroomSelected}
            activeBathroomName={activeBathroomName}
            closestBathroomId={closestBathroomId}
            onSelectBathroom={handleSelectBathroom}
            selectedRestaurant={selectedRestaurant}
          />
        </section>
      </div>
    </main>
  );
};

export default InteractiveMap;