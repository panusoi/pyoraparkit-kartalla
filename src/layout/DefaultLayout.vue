<script setup lang="ts">
import useMenu from '../composables/useMenu';
import useParkingSpotDetails from '../composables/useParkingSpotDetails';
const { isMenuOpen } = useMenu();
const { isOpen: isParkingSpotDetailsOpen } = useParkingSpotDetails();
</script>

<template>
  <div>
    <div class="relative z-0 flex h-dvh">
      <div class="z-0 h-full w-full">
        <slot name="map"></slot>
      </div>
      <div
        :class="[
          isMenuOpen && !isParkingSpotDetailsOpen ? 'visible' : 'collapse',
          !isParkingSpotDetailsOpen ? 'md:visible' : '',
          'absolute inset-y-0 left-0 z-10 w-full bg-primary-light-50 p-4 text-primary-light-600 md:m-4 md:w-96 md:rounded-xl md:shadow-lg dark:bg-primary-dark-50 dark:text-primary-dark-600',
        ]"
      >
        <slot name="menu"></slot>
      </div>
      <div
        :class="[
          isParkingSpotDetailsOpen ? 'visible' : 'collapse',
          'absolute inset-y-0 right-0 z-10 w-full bg-primary-light-50 p-4 text-primary-light-600 md:m-4 md:w-96 md:rounded-xl md:shadow-lg dark:bg-primary-dark-50 dark:text-primary-dark-600',
        ]"
      >
        <slot name="parking-spot-details"></slot>
      </div>
    </div>
  </div>
</template>
