<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import ParkingSpotList from '../../components/ParkingSpotList/ParkingSpotList.vue';
import ParkingSpotListItem from '../../components/ParkingSpotList/ParkingSpotListItem.vue';
import tampereParkingSpots from '../../data/tampere';
import { calculateDistance } from '../../utils/distance';
import {
  CurrentLocationInjectionKey,
  FocusedParkingSpotInjectionKey,
} from '../../injection/location.injection';
import type { LatLng } from '../../types/location';
import { IsMenuOpenInjectionKey } from '../../injection/menu.injection';
import { injectStrict } from '../../utils/inject';
import { getDistanceToNow } from '../../utils/time';

const currentLocation = injectStrict(CurrentLocationInjectionKey);
const focusedParkingSpot = injectStrict(FocusedParkingSpotInjectionKey);
const isMenuOpen = injectStrict(IsMenuOpenInjectionKey);

const isStaleCurrentLocation = ref(false);

const spots = computed(() => {
  if (currentLocation.value.status === 'current') {
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

watchEffect((cleanup) => {
  if (currentLocation.value.status === 'current') {
    const staleTime = 300;
    const seconds = getDistanceToNow(currentLocation.value.timestamp);
    isStaleCurrentLocation.value = seconds > staleTime;

    if (seconds < staleTime) {
      const timeout = setTimeout(
        () => {
          isStaleCurrentLocation.value = true;
        },
        (staleTime - seconds) * 1_000,
      );

      cleanup(() => {
        clearTimeout(timeout);
      });
    }
  }
});

function onShowOnMap(coordinates: LatLng) {
  focusedParkingSpot.value = coordinates;
  isMenuOpen.value = false;
}
</script>

<template>
  <div v-if="currentLocation.status !== 'current'">
    {{ $t(`closest.${currentLocation.status}`) }}
  </div>
  <div
    class="mb-1 bg-primary-light-50 p-2 text-center text-red-600 dark:bg-primary-dark-50"
    v-if="isStaleCurrentLocation"
  >
    {{ $t('closest.stale') }}
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
