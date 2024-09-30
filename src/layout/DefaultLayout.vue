<script setup lang="ts">
import { provide, ref } from 'vue';
import { IsMenuOpenInjectionKey } from '../injection/menu.injection';

const isMenuOpen = ref(false);
provide(IsMenuOpenInjectionKey, isMenuOpen);
</script>

<template>
  <div>
    <div class="relative z-0 flex h-dvh">
      <div class="z-0 h-full w-full">
        <slot name="map"></slot>
      </div>
      <div
        :class="[
          isMenuOpen ? 'visible' : 'collapse',
          'absolute inset-y-0 left-0 z-10 w-full bg-primary-light-50 p-4 text-primary-light-600 md:visible md:m-4 md:w-96 md:rounded-xl md:shadow-lg dark:bg-primary-dark-50 dark:text-primary-dark-600',
        ]"
      >
        <slot name="menu"></slot>
      </div>
    </div>
  </div>
</template>
