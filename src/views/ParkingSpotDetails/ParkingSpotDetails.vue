<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { computed } from 'vue';
import { calculateDistance, formatDistance } from '../../utils/distance';
import useParkingSpotDetails from '../../composables/useParkingSpotDetails';
import useGeolocation from '../../composables/useGeolocation';
import ExternalLink from '../../components/ExternalLink.vue';

const { location } = useGeolocation();
const { spot, close } = useParkingSpotDetails();

const distance = computed(() => {
  if (location.value.status !== 'current' || spot.value === null) {
    return 0;
  }
  return calculateDistance(location.value, spot.value.coordinates);
});
</script>

<template>
  <div
    class="flex h-full flex-col items-center gap-4 overflow-y-auto"
    data-testid="parking-spot-details"
  >
    <div class="just flex w-full flex-row items-center justify-between">
      <h1 class="text-3xl font-bold">{{ $t('name') }}</h1>
      <button
        data-testid="btn-spot-details-close"
        type="button"
        class="m-2 rounded-full bg-primary-light-100/20 p-1 text-primary-light-500 hover:text-primary-light-700 dark:bg-primary-dark-400/20 dark:text-primary-dark-500 dark:hover:text-primary-dark-700"
        :aria-label="$t('parkingSpotDetails.close')"
        @click="close"
      >
        <XMarkIcon class="size-5" />
      </button>
    </div>

    <template v-if="spot">
      <div
        :class="[
          'flex w-full flex-col gap-2 bg-primary-light-600/20 p-3 text-black dark:bg-primary-dark-600/20 dark:text-white',
          true ? 'border-t border-primary-light-200 dark:border-primary-dark-200' : '',
        ]"
        :data-testid="`spot-${spot.id}`"
      >
        <div
          class="w-full bg-primary-light-50 dark:bg-primary-dark-50"
          :data-testid="`spot-${spot.id}`"
        >
          <div class="px-4 py-5 sm:px-6">
            <div class="flex flex-col items-center justify-between">
              <h2 class="inline-flex flex-col items-center text-lg font-medium leading-6">
                <span data-testid="distance">{{ formatDistance(distance) }}</span>
                <small v-if="spot.area">
                  <span>{{ spot.area }}</span>
                </small>
              </h2>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                <span>{{ spot.rack.manufacturer }} {{ spot.rack.model }}</span>
                <span v-if="spot.rack.manufacturer || spot.rack.model"> • </span>
                <span>{{ spot.rack.spots }} {{ $t('parkingSpot.spots') }}</span>
              </p>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                <span>{{ $t(`parkingSpot.type.${spot.type}`) }} </span>
                <span v-if="spot.type"> • </span>

                <span v-if="spot.rack.frameLock === true" class="text-green-600">
                  {{ $t('parkingSpot.frameLock.true') }}
                </span>
                <span v-else-if="spot.rack.frameLock === false" class="text-red-600">
                  {{ $t('parkingSpot.frameLock.false') }}
                </span>
              </p>

              <div class="text-red-600" v-if="spot.status === 'NOT_IN_USE'">
                {{ $t('parkingSpot.status.NOT_IN_USE') }}
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <ExternalLink
                :data-testid="`ext-img-${spot.id}`"
                :href="spot.image"
                v-if="spot.image"
                :text="$t('parkingSpot.showImage')"
              />
            </div>
          </div>
        </div>
        <details class="w-full overflow-x-auto bg-primary-light-50 p-2 dark:bg-primary-dark-50">
          <summary>{{ $t('parkingSpotDetails.showRawData') }}</summary>
          <pre>{{ JSON.stringify(spot, null, 2) }}</pre>
        </details>
      </div>
    </template>
  </div>
</template>
