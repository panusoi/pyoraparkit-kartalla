import { ref, watchEffect } from 'vue';
import type { LatLng } from '../types/location';
import useGeolocation from './useGeolocation';

let isLocationCentered = false;

const { location } = useGeolocation();

const mapReady = ref<boolean>(false);

const center = ref<[number, number]>(
  [61.49911, 23.78712], // Tampere
);

const focus = ref<[number, number] | null>(null);

function setCenter(coordinates: LatLng): void {
  center.value = [coordinates.lat, coordinates.lng];
}

function setFocus(coordinates: LatLng): void {
  setCenter(coordinates);
  focus.value = [coordinates.lat, coordinates.lng];
}

function setMapReady(map: unknown) {
  mapReady.value = true;
  // Exposes Leaflet map object to window, used in tests
  (window as unknown as { __LEAFLET_MAP__: unknown }).__LEAFLET_MAP__ = map;
}

watchEffect(() => {
  if (
    location.value.status === 'current' &&
    mapReady.value === true &&
    isLocationCentered === false
  ) {
    setCenter(location.value);
    isLocationCentered = true;
  }
});

export default function useMap() {
  return { center, focus, setCenter, setFocus, setMapReady };
}
