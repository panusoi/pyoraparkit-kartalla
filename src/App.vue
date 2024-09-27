<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import i18next from 'i18next';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';

function changeLanguage(lang: 'fi' | 'en') {
  i18next.changeLanguage(lang);
}
</script>

<template>
  <h1 class="text-3xl font-bold">{{ $t('name') }}</h1>
  <div style="height: 600px; width: 800px">
    <l-map ref="map" :zoom="12" :center="[61.49911, 23.78712]" :useGlobalLeaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      ></l-tile-layer>
    </l-map>
  </div>
  <div class="flex flex-row gap-2">
    <button role="button" v-on:click="changeLanguage('fi')">FI</button>
    <button role="button" v-on:click="changeLanguage('en')">EN</button>
  </div>
</template>
