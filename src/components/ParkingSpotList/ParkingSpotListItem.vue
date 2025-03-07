<script setup lang="ts">
import type { ParkingSpot } from '../../types/parking.types';
import { formatDistance } from '../../utils/distance';
import ExternalLink from '../ExternalLink.vue';

export type ParkingSpotListItemProps = {
  spot: ParkingSpot;
  distance: number;
  border?: boolean;
};

const { spot, distance, border } = defineProps<ParkingSpotListItemProps>();
const { area, type, status, rack, image } = spot;
const emit = defineEmits(['showOnMap']);
</script>

<template>
  <li
    :class="[
      'bg-primary-light-50 dark:bg-primary-dark-50 w-full',
      border ? 'border-primary-light-200 dark:border-primary-dark-200 border-t' : '',
    ]"
    :data-testid="`spot-${spot.id}`"
  >
    <div class="px-4 py-5 sm:px-6">
      <div class="flex flex-col items-center justify-between">
        <h3 class="inline-flex flex-col items-center text-lg leading-6 font-medium">
          <span data-testid="distance">{{ formatDistance(distance) }}</span>
          <small v-if="area">
            <span>{{ area }}</span>
          </small>
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          <span>{{ rack.manufacturer }} {{ rack.model }}</span>
          <span v-if="rack.manufacturer || rack.model"> • </span>
          <span>{{ rack.spots }} {{ $t('parkingSpot.spots') }}</span>
        </p>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          <span>{{ $t(`parkingSpot.type.${type}`) }} </span>
          <span v-if="type"> • </span>

          <span v-if="rack.frameLock === true" class="text-green-600">
            {{ $t('parkingSpot.frameLock.true') }}
          </span>
          <span v-else-if="rack.frameLock === false" class="text-red-600">
            {{ $t('parkingSpot.frameLock.false') }}
          </span>
        </p>

        <div class="text-red-600" v-if="status === 'NOT_IN_USE'">
          {{ $t('parkingSpot.status.NOT_IN_USE') }}
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <ExternalLink
          :data-testid="`ext-img-${spot.id}`"
          :href="image"
          v-if="image"
          :text="$t('parkingSpot.showImage')"
        />
        <span v-else></span>
        <button
          :data-testid="`spot-btn-show-${spot.id}`"
          type="button"
          class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
          @click="emit('showOnMap')"
        >
          {{ $t('parkingSpot.showOnMap') }}
        </button>
      </div>
    </div>
  </li>
</template>
