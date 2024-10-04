import type { InjectionKey, Ref } from 'vue';
import type { LatLng } from '../types/location';

export const FocusedParkingSpotInjectionKey: InjectionKey<Ref<LatLng | null>> =
  Symbol('FocusedParkingSpot');
