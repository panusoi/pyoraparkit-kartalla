<script setup lang="ts">
import { TabPanel } from '@headlessui/vue';
</script>

<template>
  <TabPanel
    :class="[
      'bg-primary-light-600/20 dark:bg-primary-dark-600/20 h-full overflow-auto rounded-xl p-3 text-black dark:text-white',
      'ring-primary-light-100/60 ring-offset-primary-light-400 dark:ring-primary-dark-100/60 dark:ring-offset-primary-dark-400 ring-offset-2 focus:ring-2 focus:outline-hidden',
    ]"
  >
    <slot></slot>
  </TabPanel>
</template>
