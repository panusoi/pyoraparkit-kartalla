<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import {
  LMap,
  LTileLayer,
  LControlZoom,
  LControl,
  LMarker,
  LCircleMarker,
  LIcon,
} from '@vue-leaflet/vue-leaflet';
import { watch } from 'vue';
import { Bars3Icon } from '@heroicons/vue/20/solid';
import tampereParkingSpots from '../../data/tampere';
import IconNavigation from '../../components/IconNavigation.vue';
import useGeolocation from '../../composables/useGeolocation';
import useMap from '../../composables/useMap';
import useMenu from '../../composables/useMenu';
import useParkingSpotDetails from '../../composables/useParkingSpotDetails';
import type { ParkingSpot } from '../../types/parking.types';
import {
  markerBike,
  markerBikeWithLock,
  markerConnection,
  markerConnectionWithLock,
} from '../../assets/markers';

const { center, focus, setCenter, setMapReady, setFocus } = useMap();
const { location, refresh } = useGeolocation();
const { isMenuOpen, openMenu } = useMenu();
const { open: openParkingSpotDetails } = useParkingSpotDetails();

function getParkingSpotIcon(spot: ParkingSpot) {
  if (spot.type === 'BIKE_PARKING') {
    if (spot.rack?.frameLock === true) {
      return markerBikeWithLock;
    }
    return markerBike;
  }
  if (spot.type === 'CONNECTION_PARKING') {
    if (spot.rack?.frameLock === true) {
      return markerConnectionWithLock;
    }
    return markerConnection;
  }
  return '';
}

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
    setCenter(location.value);
    refresh();
  }
}

function markerClick(spot: ParkingSpot) {
  setFocus(spot.coordinates);
  openParkingSpotDetails(spot);
}
</script>

<template>
  <l-map
    data-testid="map"
    v-model:center="center"
    ref="map"
    :zoom="16"
    :useGlobalLeaflet="false"
    :options="{ zoomControl: false }"
    @ready="setMapReady"
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
        data-testid="btn-menu-open"
        :class="[isMenuOpen ? 'collapse' : 'visible', 'bg-slate-50 p-4 hover:bg-slate-200']"
        :aria-label="$t('menu.open')"
        @click="openMenu"
      >
        <Bars3Icon class="size-5" />
      </button>
    </l-control>
    <l-control position="bottomright">
      <button
        data-testid="btn-current-location"
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
      <l-marker
        :options="{ title: `${spot.area} (${spot.id})` }"
        :aria-label="$t('parkingSpotDetails.open')"
        :lat-lng="[spot.coordinates.lat, spot.coordinates.lng]"
        @click="markerClick(spot)"
      >
        <l-icon
          :icon-url="getParkingSpotIcon(spot)"
          :icon-anchor="[18, 40]"
          :icon-size="[37, 41]"
        />
      </l-marker>
    </template>
  </l-map>
</template>
