<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

import MapView from './views/MapView/MapView.vue';
import AppMenu from './views/AppMenu/AppMenu.vue';
import DefaultLayout from './layout/DefaultLayout.vue';
import { provide, ref } from 'vue';
import type { CurrentLocation, LatLng } from './types/location';
import {
  CurrentLocationInjectionKey,
  FocusedParkingSpotInjectionKey,
} from './injection/location.injection';

const currentLocation = ref<CurrentLocation>({ status: 'pending' });
const focusedParkingSpot = ref<LatLng | null>(null);

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { longitude: lng, latitude: lat }, timestamp }) => {
      currentLocation.value = { lng, lat, timestamp, status: 'current' };
    },
    () => {
      currentLocation.value = { status: 'blocked' };
    },
  );
} else {
  currentLocation.value = { status: 'unsupported' };
}

function focusOnParkingSpot(coordinates: LatLng) {
  focusedParkingSpot.value = coordinates;
}

provide(CurrentLocationInjectionKey, currentLocation);
provide(FocusedParkingSpotInjectionKey, {
  coordinates: focusedParkingSpot,
  focus: focusOnParkingSpot,
});
</script>

<template>
  <DefaultLayout>
    <template v-slot:map>
      <MapView />
    </template>
    <template v-slot:menu>
      <AppMenu />
    </template>
  </DefaultLayout>
</template>
