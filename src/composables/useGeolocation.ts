import { onUnmounted, ref } from 'vue';
import type { CurrentLocation } from '../types/location';
import { getLocationHighAccuracy, getLocationMode } from '../utils/location';

const isSupported = navigator && 'geolocation' in navigator;

export function useGeolocation() {
  let watcher: number;
  const location = ref<CurrentLocation>({ status: 'pending' });
  const mode = ref(getLocationMode());
  const enableHighAccuracy = ref(getLocationHighAccuracy());

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

  function updateLocation() {
    if (watcher && navigator) {
      navigator.geolocation.clearWatch(watcher);
    }
    if (isSupported) {
      if (mode.value === 'auto') {
        watcher = navigator!.geolocation.watchPosition(successCallback, errorCallback, {
          enableHighAccuracy: enableHighAccuracy.value,
          maximumAge: 10_000,
        });
      } else {
        navigator!.geolocation.getCurrentPosition(successCallback, errorCallback, {
          enableHighAccuracy: enableHighAccuracy.value,
          maximumAge: 10_000,
        });
      }
    }
  }

  function reset() {
    mode.value = getLocationMode();
    enableHighAccuracy.value = getLocationHighAccuracy();
    updateLocation();
  }

  function refresh() {
    updateLocation();
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
    refresh,
  };
}
