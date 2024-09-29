<script setup lang="ts">
import ParkingSpotList from '../../components/ParkingSpotList/ParkingSpotList.vue';
import ParkingSpotListItem, {
  type ParkingSpotListItemProps,
} from '../../components/ParkingSpotList/ParkingSpotListItem.vue';

const spots: ParkingSpotListItemProps[] = [
  {
    spot: {
      area: 'Nalkala',
      coordinates: { lat: 1, lon: 2 },
      id: 'tre:223',
      rack: {
        count: 2,
        frameLock: false,
        manufacturer: 'Finture',
        model: 'Perinteinen',
        spots: 16,
      },
      status: 'IN_USE',
      type: 'BIKE_PARKING',
      image: 'https://kartat.tampere.fi/valokuvia/isot_sensuroitu/223.JPG',
    },
    distance: 100,
  },
  {
    spot: {
      area: 'Kaakinmaa',
      coordinates: { lat: 1, lon: 2 },
      id: 'tre:267',
      rack: {
        count: 2,
        frameLock: false,
        manufacturer: 'Finture',
        model: 'Perinteinen',
        spots: 10,
      },
      status: 'IN_USE',
      type: 'CONNECTION_PARKING',
      image: 'https://kartat.tampere.fi/valokuvia/isot_sensuroitu/267.JPG',
    },
    distance: 100,
  },
  {
    spot: {
      area: 'Ratina',
      coordinates: { lat: 1, lon: 2 },
      id: 'tre:11',
      rack: { count: 6, frameLock: true, manufacturer: 'Alushel', model: 'BAR-L60', spots: 12 },
      status: 'NOT_IN_USE',
      type: 'BIKE_PARKING',
    },
    distance: 100,
  },
];
</script>

<template>
  <ParkingSpotList>
    <template v-for="({ spot, distance }, idx) in spots" :key="spot.id">
      <ParkingSpotListItem :spot="spot" :distance="distance" :border="idx > 0" />
    </template>
  </ParkingSpotList>
</template>
