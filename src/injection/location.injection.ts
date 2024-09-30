import type { InjectionKey, Ref } from 'vue';
import type { CurrentLocation } from '../types/location';

export const CurrentLocationInjectionKey: InjectionKey<Ref<CurrentLocation>> =
  Symbol('CurrentLocation');
