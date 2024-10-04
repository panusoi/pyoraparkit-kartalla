<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

import MapView from './views/MapView/MapView.vue';
import AppMenu from './views/AppMenu/AppMenu.vue';
import DefaultLayout from './layout/DefaultLayout.vue';
import { provide, ref } from 'vue';
import type { LatLng } from './types/location';
import { FocusedParkingSpotInjectionKey } from './injection/location.injection';
const focusedParkingSpot = ref<LatLng | null>(null);

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
