import { computed, ref } from 'vue';
import type { ParkingSpot } from '../types/parking.types';

const spot = ref<ParkingSpot | null>(null);
const isOpen = computed(() => spot.value !== null);

function open(value: ParkingSpot) {
  spot.value = value;
}

function close() {
  spot.value = null;
}

export default function useParkingSpotDetails() {
  return { isOpen, spot, open, close };
}
