import { useMemo } from "react";

export const useMapEntities = (databaseNodes: any[], targetBathroomId: string | null, selectedRestaurantId: string | null) => {
  const restaurants = useMemo(() => databaseNodes.filter(n => n.type === 'restaurant' || n.type === 'bar'), [databaseNodes]);
  const bathrooms = useMemo(() => databaseNodes.filter(n => n.type === 'bathroom'), [databaseNodes]);
  const currentNode = databaseNodes.find(n => n.id === "current");

  const selectedRestaurant = useMemo(() => {
    return restaurants.find((r) => r.id === selectedRestaurantId) || null;
  }, [selectedRestaurantId, restaurants]);

  const closestBathroomId = useMemo(() => {
    const isInvalidState = !currentNode || bathrooms.length === 0;
    if (isInvalidState) {
        return "banheiro_masc";
    }

    let nearestId = "banheiro_masc";
    let minDistance = Infinity;

    bathrooms.forEach(node => {
      const dist = Math.sqrt(Math.pow(node.lat - currentNode.lat, 2) + Math.pow(node.lng - currentNode.lng, 2));
      const isCloser = dist < minDistance;

      if (isCloser) {
        minDistance = dist;
        nearestId = node.id;
      }
    });

    return nearestId;
  }, [currentNode, bathrooms]);

  const activeBathroomName = useMemo(() => {
    const found = bathrooms.find(b => b.id === targetBathroomId);
    if (found && found.name) return found.name;

    const isTargeting = targetBathroomId !== null;
    if (isTargeting) return targetBathroomId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return "Banheiro Mais Próximo";
  }, [targetBathroomId, bathrooms]);

  return {
    restaurants,
    bathrooms,
    currentNode,
    selectedRestaurant,
    closestBathroomId,
    activeBathroomName
  };
};