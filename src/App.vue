<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

import MapView from './views/MapView/MapView.vue';
import AppMenu from './views/AppMenu/AppMenu.vue';
import DefaultLayout from './layout/DefaultLayout.vue';
import ParkingSpotDetails from './views/ParkingSpotDetails/ParkingSpotDetails.vue';
</script>

<template>
  <DefaultLayout>
    <template v-slot:map>
      <MapView />
    </template>
    <template v-slot:menu>
      <AppMenu />
    </template>
    <template v-slot:parking-spot-details>
      <ParkingSpotDetails />
    </template>
  </DefaultLayout>
</template>
