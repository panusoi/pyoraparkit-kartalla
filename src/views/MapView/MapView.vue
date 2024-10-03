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
import { ref, watch, watchEffect } from 'vue';
import { Bars3Icon } from '@heroicons/vue/20/solid';
import tampereParkingSpots from '../../data/tampere';
import {
  CurrentLocationInjectionKey,
  FocusedParkingSpotInjectionKey,
  RefreshLocationInjectionKey,
} from '../../injection/location.injection';
import { IsMenuOpenInjectionKey } from '../../injection/menu.injection';
import { injectStrict } from '../../utils/inject';
import IconNavigation from '../../components/IconNavigation.vue';

const center = ref<[number, number]>([61.49911, 23.78712]);
const currentLocation = injectStrict(CurrentLocationInjectionKey);
const focusedParkingSpot = injectStrict(FocusedParkingSpotInjectionKey);
const isMenuOpen = injectStrict(IsMenuOpenInjectionKey);
const refreshGeolocation = injectStrict(RefreshLocationInjectionKey);

watch(
  currentLocation,
  () => {
    if (currentLocation.value.status === 'current') {
      center.value = [currentLocation.value.lat, currentLocation.value.lng];
    }
  },
  { once: true },
);

watchEffect(() => {
  if (focusedParkingSpot.value) {
    center.value = [focusedParkingSpot.value.lat, focusedParkingSpot.value.lng];
  }
});

function currentLocationClick() {
  if (currentLocation.value.status === 'current') {
    center.value = [currentLocation.value.lat, currentLocation.value.lng];
    refreshGeolocation();
  }
}
</script>

<template>
  <l-map
    v-model:center="center"
    ref="map"
    :zoom="16"
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
          isMenuOpen ? 'collapse' : 'visible',
          'bg-slate-50 p-4 hover:bg-slate-200 md:collapse',
        ]"
        :aria-label="$t('menu.open')"
        @click="isMenuOpen = true"
      >
        <Bars3Icon class="size-5" />
      </button>
    </l-control>
    <l-control position="bottomright">
      <button
        :class="['bg-slate-50 p-2 hover:bg-slate-200']"
        :aria-label="$t('map.currentLocation')"
        @click="currentLocationClick"
      >
        <IconNavigation class="size-5" />
      </button>
    </l-control>
    <l-circle-marker
      v-if="currentLocation.status === 'current'"
      :lat-lng="[currentLocation.lat, currentLocation.lng]"
      :radius="10"
      color="red"
    ></l-circle-marker>
    <l-circle-marker
      v-if="focusedParkingSpot"
      :lat-lng="[focusedParkingSpot.lat, focusedParkingSpot.lng]"
      :radius="10"
      color="blue"
    ></l-circle-marker>
    <template v-for="spot in tampereParkingSpots" :key="spot.id">
      <l-marker :lat-lng="[spot.coordinates.lat, spot.coordinates.lng]"> </l-marker>
    </template>
  </l-map>
</template>
