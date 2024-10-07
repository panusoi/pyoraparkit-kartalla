<script setup lang="ts">
import useMenu from '../composables/useMenu';
import useParkingSpotDetails from '../composables/useParkingSpotDetails';
const { isMenuOpen } = useMenu();
const { isOpen: isParkingSpotDetailsOpen } = useParkingSpotDetails();
const menuClass =
  'absolute inset-y-0 z-10 w-full bg-primary-light-50 p-4 text-primary-light-600 md:m-4 md:w-96 md:rounded-xl md:shadow-lg dark:bg-primary-dark-50 dark:text-primary-dark-600';
</script>

<template>
  <div>
    <div class="relative z-0 flex h-dvh">
      <div class="z-0 h-full w-full">
        <slot name="map"></slot>
      </div>
      <transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100 "
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isMenuOpen && !isParkingSpotDetailsOpen" :class="[menuClass, 'left-0']">
          <slot name="menu"></slot></div
      ></transition>
      <transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isParkingSpotDetailsOpen" :class="[menuClass, 'right-0']">
          <slot name="parking-spot-details"></slot></div
      ></transition>
    </div>
  </div>
</template>
