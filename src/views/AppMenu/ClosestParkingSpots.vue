<script setup lang="ts">
import { computed, inject } from 'vue';
import ParkingSpotList from '../../components/ParkingSpotList/ParkingSpotList.vue';
import ParkingSpotListItem from '../../components/ParkingSpotList/ParkingSpotListItem.vue';
import tampereParkingSpots from '../../data/tampere';
import { calculateDistance } from '../../utils/distance';
import {
  CurrentLocationInjectionKey,
  FocusedParkingSpotInjectionKey,
} from '../../injection/location.injection';
import type { LatLng } from '../../types/location';
import { MenuToggleInjectionKey } from '../../injection/menu.injection';

const currentLocation = inject(CurrentLocationInjectionKey);
const focusedParkingSpot = inject(FocusedParkingSpotInjectionKey);
const menuToggle = inject(MenuToggleInjectionKey);

const locationStatus = computed(() => currentLocation?.value.status ?? 'pending');

const spots = computed(() => {
  if (currentLocation?.value.status === 'current') {
    const currentLngLat = currentLocation.value;
    return tampereParkingSpots
      .map((spot) => ({
        spot,
        distance: calculateDistance(currentLngLat, spot.coordinates),
      }))
      .sort(({ distance: a }, { distance: b }) => a - b)
      .slice(0, 25);
  }
  return [];
});

function onShowOnMap(coordinates: LatLng) {
  focusedParkingSpot?.focus(coordinates);
  menuToggle?.();
}
</script>

<template>
  <div v-if="locationStatus !== 'current'">
    {{ $t(`closest.${locationStatus}`) }}
  </div>
  <ParkingSpotList v-if="spots.length > 0">
    <template v-for="({ spot, distance }, idx) in spots" :key="spot.id">
      <ParkingSpotListItem
        :spot="spot"
        :distance="distance"
        :border="idx > 0"
        @showOnMap="onShowOnMap(spot.coordinates)"
      />
    </template>
  </ParkingSpotList>
</template>
