<script setup lang="ts">
import { type SelectHTMLAttributes } from 'vue';

// https://github.com/vuejs/rfcs/discussions/479
interface Props extends /* @vue-ignore */ SelectHTMLAttributes {
  id: string;
  label: string;
}
const model = defineModel<string>();
const { label } = defineProps<Props>();
</script>

<template>
  <label :for="id" class="mb-2 block text-sm font-medium">{{ label }}</label>
  <select
    :id="id"
    class="border-primary-light-300 focus:border-primary-light-500 focus:ring-primary-light-500 dark:border-primary-dark-300 dark:focus:border-primary-light-500 dark:focus:ring-primary-dark-500 block w-full rounded-lg border bg-gray-50 p-2.5 text-sm dark:bg-gray-700"
    v-bind="$attrs"
    v-model="model"
  >
    <slot></slot>
  </select>
</template>
