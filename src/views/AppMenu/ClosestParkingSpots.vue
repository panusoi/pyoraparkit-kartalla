<script setup lang="ts">
import ParkingSpotList from '../../components/ParkingSpotList/ParkingSpotList.vue';
import ParkingSpotListItem, {
  type ParkingSpotListItemProps,
} from '../../components/ParkingSpotList/ParkingSpotListItem.vue';
import tampereParkingSpots from '../../data/tampere';

const spots: ParkingSpotListItemProps[] = tampereParkingSpots.map((spot) => ({
  spot,
  distance: 100,
}));
</script>

<template>
  <ParkingSpotList>
    <template v-for="({ spot, distance }, idx) in spots" :key="spot.id">
      <ParkingSpotListItem :spot="spot" :distance="distance" :border="idx > 0" />
    </template>
  </ParkingSpotList>
</template>
