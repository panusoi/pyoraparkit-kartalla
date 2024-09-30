<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/20/solid';

const { href, text } = defineProps<{ href: string; text: string }>();
</script>

<template>
  <a
    :href="href"
    rel="nofollow noopener noreferrer external"
    target="_blank"
    class="font-medium text-blue-600 hover:underline dark:text-blue-500"
  >
    <span>{{ text }}</span>
    <span class="inline-block pl-1 align-text-bottom"
      ><ArrowTopRightOnSquareIcon class="size-5"
    /></span>
  </a>
</template>
