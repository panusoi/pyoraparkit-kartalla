<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LControlZoom, LControl, LMarker } from '@vue-leaflet/vue-leaflet';
import { inject } from 'vue';
import { MenuOpenInjectionKey, MenuToggleInjectionKey } from '../../injection/menu.injection';
import IconBars3 from '../../components/icons/IconBars3.vue';
import tampereParkingSpots from '../../data/tampere';

const menuOpen = inject(MenuOpenInjectionKey, null);
const toggleMenu = inject(MenuToggleInjectionKey, () => undefined);
</script>

<template>
  <l-map
    ref="map"
    :zoom="12"
    :center="[61.49911, 23.78712]"
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
        <IconBars3 />
      </button>
    </l-control>
    <template v-for="spot in tampereParkingSpots" :key="spot.id">
      <l-marker :lat-lng="[spot.coordinates.lat, spot.coordinates.lng]"> </l-marker>
    </template>
  </l-map>
</template>
