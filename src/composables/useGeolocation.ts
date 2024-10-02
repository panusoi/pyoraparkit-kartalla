import { onUnmounted, ref } from 'vue';
import type { CurrentLocation } from '../types/location';
import { getLocationHighAccuracy, getLocationMode } from '../utils/location';

const isSupported = navigator && 'geolocation' in navigator;

export function useGeolocation() {
  let watcher: number;
  const location = ref<CurrentLocation>({ status: 'pending' });

  if (!isSupported) {
    location.value = { status: 'unsupported' };
  }

  function successCallback({
    coords: { longitude: lng, latitude: lat },
    timestamp,
  }: GeolocationPosition) {
    location.value = { lng, lat, timestamp, status: 'current' };
  }

  function errorCallback() {
    location.value = { status: 'blocked' };
  }

  function reset() {
    if (watcher && navigator) {
      navigator.geolocation.clearWatch(watcher);
    }

    if (isSupported) {
      const mode = getLocationMode();
      const enableHighAccuracy = getLocationHighAccuracy();

      if (mode === 'auto') {
        watcher = navigator!.geolocation.watchPosition(successCallback, errorCallback, {
          enableHighAccuracy,
          maximumAge: 10_000,
        });
      } else {
        navigator!.geolocation.getCurrentPosition(successCallback, errorCallback, {
          enableHighAccuracy,
          maximumAge: 10_000,
        });
      }
    }
  }

  reset();

  onUnmounted(() => {
    if (watcher && navigator) {
      navigator.geolocation.clearWatch(watcher);
    }
  });

  return {
    location,
    reset,
  };
}
