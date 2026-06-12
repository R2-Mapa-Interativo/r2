import { useState, useCallback } from "react";
import { GraphNode } from "@/domain/models/types";
import { API_URL } from "@/lib/api";

export const useMapRouting = () => {
  const [route, setRoute] = useState<GraphNode[]>([]);
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);
  const [redirectAlert, setRedirectAlert] = useState({ show: false, original: "", new: "" });

  const fetchRoute = useCallback(async (origin: string, destination: string, bathrooms: any[], onRedirect: (newId: string) => void) => {
    setIsFetchingRoute(true);

    try {
      const response = await fetch(`${API_URL}/api/map/route?origin_id=${origin}&destination_id=${destination}`);
      const isInvalid = !response.ok;

      if (isInvalid) {
          throw new Error("HTTP error");
      }

      const payload = await response.json();
      const isFailure = !payload.success || !payload.data;

      if (isFailure) {
        setRoute([]);
        setIsFetchingRoute(false);
        return;
      }

      setRoute(payload.data.route);

      if (payload.data.redirected) {
        const origNode = bathrooms.find(b => b.id === payload.data.original_destination);
        const newNode = bathrooms.find(b => b.id === payload.data.final_destination);

        const formatName = (id: string) => id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        onRedirect(payload.data.final_destination);

        setRedirectAlert({
          show: true,
          original: origNode?.name || formatName(payload.data.original_destination),
          new: newNode?.name || formatName(payload.data.final_destination)
        });
      }
    } catch (error) {
      setRoute([]);
    } finally {
      setIsFetchingRoute(false);
    }
  }, []);

  const clearRoute = useCallback(() => {
    setRoute([]);
  }, []);

  return {
    route,
    isFetchingRoute,
    redirectAlert,
    setRedirectAlert,
    fetchRoute,
    clearRoute
  };
};