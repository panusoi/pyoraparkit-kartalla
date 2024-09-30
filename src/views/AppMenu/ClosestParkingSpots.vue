<script setup lang="ts">
import { computed, inject } from 'vue';
import ParkingSpotList from '../../components/ParkingSpotList/ParkingSpotList.vue';
import ParkingSpotListItem from '../../components/ParkingSpotList/ParkingSpotListItem.vue';
import tampereParkingSpots from '../../data/tampere';
import { calculateDistance } from '../../utils/distance';
import { CurrentLocationInjectionKey } from '../../injection/location.injection';

const currentLocation = inject(CurrentLocationInjectionKey);

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
</script>

<template>
  <div v-if="locationStatus !== 'current'">
    {{ $t(`closest.${locationStatus}`) }}
  </div>
  <ParkingSpotList v-if="spots.length > 0">
    <template v-for="({ spot, distance }, idx) in spots" :key="spot.id">
      <ParkingSpotListItem :spot="spot" :distance="distance" :border="idx > 0" />
    </template>
  </ParkingSpotList>
</template>
