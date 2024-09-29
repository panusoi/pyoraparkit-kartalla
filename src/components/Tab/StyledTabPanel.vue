<script setup lang="ts">
import { TabPanel } from '@headlessui/vue';
</script>

<template>
  <TabPanel
    :class="[
      'h-full overflow-auto rounded-xl bg-primary-light-600/20 p-3 text-black dark:bg-primary-dark-600/20 dark:text-white',
      'ring-primary-light-100/60 ring-offset-2 ring-offset-primary-light-400 focus:outline-none focus:ring-2 dark:ring-primary-dark-100/60 dark:ring-offset-primary-dark-400',
    ]"
  >
    <slot></slot>
  </TabPanel>
</template>
