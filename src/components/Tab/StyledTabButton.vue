<script setup lang="ts">
import { Tab } from '@headlessui/vue';
</script>

<template>
  <Tab as="template" v-slot="{ selected }">
    <button
      :class="[
        'w-full rounded-lg py-2.5 text-sm leading-5 font-medium',
        'ring-primary-light-200/60 ring-offset-primary-light-400 dark:ring-primary-dark-200/60 dark:ring-offset-primary-dark-400 ring-offset-2 focus:ring-2 focus:outline-hidden',
        selected
          ? 'bg-primary-light-100 text-primary-light-900 dark:bg-primary-dark-100 dark:text-primary-dark-900 shadow-sm'
          : 'text-primary-light-600 hover:bg-primary-light-50/[0.20] hover:text-primary-light-500 dark:text-primary-dark-600 dark:hover:bg-primary-dark-50/[0.20] dark:hover:text-primary-dark-500',
      ]"
    >
      <slot></slot>
    </button>
  </Tab>
</template>
