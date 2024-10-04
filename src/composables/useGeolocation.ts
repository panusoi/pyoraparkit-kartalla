import { ref, watchEffect } from 'vue';
import type { CurrentLocation } from '../types/location';
import useSettings from './useSettings';

const { locationMode, locationHighAccuracy } = useSettings();

const isSupported = navigator && 'geolocation' in navigator;

const location = ref<CurrentLocation>({ status: 'pending' });

function successCallback({
  coords: { longitude: lng, latitude: lat },
  timestamp,
}: GeolocationPosition) {
  location.value = { lng, lat, timestamp, status: 'current' };
}

function errorCallback() {
  location.value = { status: 'blocked' };
}

function getPosition() {
  navigator!.geolocation.getCurrentPosition(successCallback, errorCallback, {
    enableHighAccuracy: locationHighAccuracy.value,
    maximumAge: 10_000,
  });
}

watchEffect((onCleanup) => {
  let watcher: number;

  if (isSupported) {
    if (locationMode.value === 'auto') {
      watcher = navigator!.geolocation.watchPosition(successCallback, errorCallback, {
        enableHighAccuracy: locationHighAccuracy.value,
        maximumAge: 10_000,
      });
    } else {
      getPosition();
    }
  }

  onCleanup(() => {
    if (watcher && navigator) {
      navigator.geolocation.clearWatch(watcher);
    }
  });
}, {});

function refresh() {
  if (locationMode.value === 'manual') {
    getPosition();
  }
}

export default function useGeolocation() {
  if (!isSupported) {
    location.value = { status: 'unsupported' };
  }

  return {
    location,
    refresh,
  };
}
