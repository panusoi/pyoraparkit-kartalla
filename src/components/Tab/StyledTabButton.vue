<script setup lang="ts">
import { Tab } from '@headlessui/vue';
</script>

<template>
  <Tab as="template" v-slot="{ selected }">
    <button
      :class="[
        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
        'ring-primary-light-200/60 ring-offset-2 ring-offset-primary-light-400 focus:outline-none focus:ring-2 dark:ring-primary-dark-200/60 dark:ring-offset-primary-dark-400',
        selected
          ? 'bg-primary-light-100 text-primary-light-900 shadow dark:bg-primary-dark-100 dark:text-primary-dark-900'
          : 'text-primary-light-600 hover:bg-primary-light-50/[0.20] hover:text-primary-light-500 dark:text-primary-dark-600 dark:hover:bg-primary-dark-50/[0.20] dark:hover:text-primary-dark-500',
      ]"
    >
      <slot></slot>
    </button>
  </Tab>
</template>
