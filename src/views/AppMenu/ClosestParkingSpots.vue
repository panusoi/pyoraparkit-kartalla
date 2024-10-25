<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import ParkingSpotList from '../../components/ParkingSpotList/ParkingSpotList.vue';
import ParkingSpotListItem from '../../components/ParkingSpotList/ParkingSpotListItem.vue';
import tampereParkingSpots from '../../data/tampere';
import { calculateDistance } from '../../utils/distance';
import type { LatLng } from '../../types/location';
import { getDistanceToNow } from '../../utils/time';
import useGeolocation from '../../composables/useGeolocation';
import useMap from '../../composables/useMap';
import useMenu from '../../composables/useMenu';
import { autoCloseMenu } from '../../utils/menu';

const { location } = useGeolocation();
const { setFocus } = useMap();
const { closeMenu } = useMenu();

const isStaleCurrentLocation = ref(false);

const spots = computed(() => {
  if (location.value.status === 'current') {
    const currentLngLat = location.value;
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
  if (location.value.status === 'current') {
    const staleTime = 300;
    const seconds = getDistanceToNow(location.value.timestamp);
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
  setFocus(coordinates);
  if (autoCloseMenu()) {
    closeMenu();
  }
}
</script>

<template>
  <div v-if="location.status !== 'current'" :data-testid="`location-status-${location.status}`">
    {{ $t(`closest.${location.status}`) }}
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
