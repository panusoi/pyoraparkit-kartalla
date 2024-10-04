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
import { watch } from 'vue';
import { Bars3Icon } from '@heroicons/vue/20/solid';
import tampereParkingSpots from '../../data/tampere';
import IconNavigation from '../../components/IconNavigation.vue';
import { useGeolocation } from '../../composables/useGeolocation';
import useMap from '../../composables/useMap';
import useMenu from '../../composables/useMenu';

const { center, focus } = useMap();
const { location, refresh } = useGeolocation();
const { isMenuOpen, openMenu } = useMenu();

watch(
  location,
  () => {
    if (location.value.status === 'current') {
      center.value = [location.value.lat, location.value.lng];
    }
  },
  { once: true },
);

function currentLocationClick() {
  if (location.value.status === 'current') {
    center.value = [location.value.lat, location.value.lng];
    refresh();
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
        @click="openMenu"
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
      v-if="location.status === 'current'"
      :lat-lng="[location.lat, location.lng]"
      :radius="10"
      color="red"
    ></l-circle-marker>
    <l-circle-marker
      v-if="focus !== null"
      :lat-lng="focus"
      :radius="10"
      color="blue"
    ></l-circle-marker>
    <template v-for="spot in tampereParkingSpots" :key="spot.id">
      <l-marker :lat-lng="[spot.coordinates.lat, spot.coordinates.lng]"> </l-marker>
    </template>
  </l-map>
</template>
