<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

import MapView from './views/MapView/MapView.vue';
import AppMenu from './views/AppMenu/AppMenu.vue';
import DefaultLayout from './layout/DefaultLayout.vue';
import { provide, ref } from 'vue';
import type { LatLng } from './types/location';
import {
  CurrentLocationInjectionKey,
  FocusedParkingSpotInjectionKey,
  RefreshLocationInjectionKey,
  ResetLocationInjectionKey,
} from './injection/location.injection';
import { useGeolocation } from './composables/useGeolocation';

const geolocation = useGeolocation();
const focusedParkingSpot = ref<LatLng | null>(null);

provide(CurrentLocationInjectionKey, geolocation.location);
provide(ResetLocationInjectionKey, geolocation.reset);
provide(RefreshLocationInjectionKey, geolocation.refresh);
provide(FocusedParkingSpotInjectionKey, focusedParkingSpot);
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
