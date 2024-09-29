<script setup lang="ts">
import { TabList } from '@headlessui/vue';
</script>

<template>
  <TabList
    class="flex flex-row gap-1 rounded-xl bg-primary-light-600/20 p-1 dark:bg-primary-dark-600/20"
    ><slot></slot
  ></TabList>
</template>
