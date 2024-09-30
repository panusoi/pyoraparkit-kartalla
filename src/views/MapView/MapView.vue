<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import {
  LMap,
  LTileLayer,
  LControlZoom,
  LControl,
  LMarker,
  LCircleMarker,
} from '@vue-leaflet/vue-leaflet';
import { inject, ref, watchEffect } from 'vue';
import { Bars3Icon } from '@heroicons/vue/20/solid';
import { MenuOpenInjectionKey, MenuToggleInjectionKey } from '../../injection/menu.injection';
import tampereParkingSpots from '../../data/tampere';
import {
  CurrentLocationInjectionKey,
  FocusedParkingSpotInjectionKey,
} from '../../injection/location.injection';

const center = ref<[number, number]>([61.49911, 23.78712]);
const currentLocation = inject(CurrentLocationInjectionKey);
const focusedParkingSpot = inject(FocusedParkingSpotInjectionKey);

watchEffect(() => {
  if (currentLocation?.value.status === 'current') {
    center.value = [currentLocation.value.lat, currentLocation.value.lng];
  }
});

watchEffect(() => {
  if (focusedParkingSpot && focusedParkingSpot.coordinates.value) {
    center.value = [
      focusedParkingSpot.coordinates.value.lat,
      focusedParkingSpot.coordinates.value.lng,
    ];
  }
});

const menuOpen = inject(MenuOpenInjectionKey, null);
const toggleMenu = inject(MenuToggleInjectionKey, () => undefined);
</script>

<template>
  <l-map
    ref="map"
    :zoom="16"
    :center="center"
    :useGlobalLeaflet="false"
    :options="{ zoomControl: false }"
  >
    <l-control-zoom position="bottomright"></l-control-zoom>
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    ></l-tile-layer>
    <l-control position="bottomleft">
      <button
        :class="[
          menuOpen ? 'collapse' : 'visible',
          'bg-slate-50 p-4 hover:bg-slate-200 md:collapse',
        ]"
        :aria-label="$t('menu.open')"
        @click="toggleMenu()"
      >
        <Bars3Icon class="size-5" />
      </button>
    </l-control>
    <l-circle-marker
      v-if="currentLocation?.status === 'current'"
      :lat-lng="[currentLocation.lat, currentLocation.lng]"
      :radius="10"
      color="red"
    ></l-circle-marker>
    <l-circle-marker
      v-if="focusedParkingSpot?.coordinates.value"
      :lat-lng="[
        focusedParkingSpot.coordinates.value.lat,
        focusedParkingSpot.coordinates.value.lng,
      ]"
      :radius="10"
      color="blue"
    ></l-circle-marker>
    <template v-for="spot in tampereParkingSpots" :key="spot.id">
      <l-marker :lat-lng="[spot.coordinates.lat, spot.coordinates.lng]"> </l-marker>
    </template>
  </l-map>
</template>
