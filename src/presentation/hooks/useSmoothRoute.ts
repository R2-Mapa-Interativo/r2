import { useMemo } from 'react';
import * as turf from '@turf/turf';
import { GraphNode } from '@/domain/models/types';

export const useSmoothRoute = (route: GraphNode[]) => {
  const smoothedRouteGeoJSON = useMemo(() => {
    const isRouteEmpty = route.length < 2;
    if (isRouteEmpty) {
        return null;
    }

    const coordinates = route.map(node => [Number(node.lng), Number(node.lat)]);
    const rawLine = turf.lineString(coordinates);
    
    const needsSmoothing = coordinates.length > 2;
    const finalLine = needsSmoothing ? turf.bezierSpline(rawLine, { resolution: 10000, sharpness: 0.85 }) : rawLine;

    return finalLine;
  }, [route]);

  return smoothedRouteGeoJSON;
};