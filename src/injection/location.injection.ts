import type { InjectionKey, Ref } from 'vue';
import type { CurrentLocation, LatLng } from '../types/location';

export const CurrentLocationInjectionKey: InjectionKey<Ref<CurrentLocation>> =
  Symbol('CurrentLocation');

export const FocusedParkingSpotInjectionKey: InjectionKey<Ref<LatLng | null>> =
  Symbol('FocusedParkingSpot');
