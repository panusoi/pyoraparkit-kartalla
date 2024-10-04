import { ref } from 'vue';
import type { LatLng } from '../types/location';

const center = ref<[number, number]>(
  [61.49911, 23.78712], // Tampere
);

const focus = ref<[number, number] | null>(null);

function setFocus(coordinates: LatLng): void {
  center.value = [coordinates.lat, coordinates.lng];
  focus.value = [coordinates.lat, coordinates.lng];
}

export default function useMap() {
  return { center, focus, setFocus };
}
