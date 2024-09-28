<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import i18next from 'i18next';

function changeLanguage(lang: 'fi' | 'en') {
  i18next.changeLanguage(lang);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2>{{ $t('tabs.settings') }}</h2>
    <div>
      <div class="flex flex-row gap-2">
        <button role="button" v-on:click="changeLanguage('fi')">FI</button>
        <button role="button" v-on:click="changeLanguage('en')">EN</button>
      </div>
    </div>
  </div>
</template>
