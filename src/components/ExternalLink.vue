<script setup lang="ts">
import IconExternalLink from './icons/IconExternalLink.vue';

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
    <span class="inline-block pl-1 align-text-bottom"><IconExternalLink /></span>
  </a>
</template>
