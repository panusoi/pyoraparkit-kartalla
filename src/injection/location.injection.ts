import type { InjectionKey, Ref } from 'vue';
import type { CurrentLocation, LatLng } from '../types/location';

export const CurrentLocationInjectionKey: InjectionKey<Ref<CurrentLocation>> =
  Symbol('CurrentLocation');

export const FocusedParkingSpotInjectionKey: InjectionKey<{
  coordinates: Ref<LatLng | null>;
  focus: (coordinates: LatLng) => void;
}> = Symbol('FocusOnParkingSpot');
