import { useState, useCallback } from 'react';

export const useMapCamera = (initialLng: number, initialLat: number) => {
  const [viewState, setViewState] = useState({
    longitude: initialLng,
    latitude: initialLat,
    zoom: 17.5,
    pitch: 30,
    bearing: 0
  });

  const handleViewStateChange = useCallback((evt: any) => {
    setViewState(evt.viewState);
  }, []);

  const resetCamera = useCallback((lng: number, lat: number) => {
    setViewState({
      longitude: lng,
      latitude: lat,
      zoom: 17.5,
      pitch: 30,
      bearing: 0
    });
  }, []);

  return {
    viewState,
    handleViewStateChange,
    resetCamera
  };
};