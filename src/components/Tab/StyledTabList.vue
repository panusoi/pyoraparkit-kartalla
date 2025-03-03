<script setup lang="ts">
import { TabList } from '@headlessui/vue';
</script>

<template>
  <TabList
    class="bg-primary-light-600/20 dark:bg-primary-dark-600/20 flex flex-row gap-1 rounded-xl p-1"
    ><slot></slot
  ></TabList>
</template>
