<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import i18next from 'i18next';
import { applyTheme } from '../../utils/theme';
import StyledSelect from '../../components/StyledSelect.vue';
import { ref } from 'vue';
import { getLanguage } from '../../utils/language';

function onThemeChange(event: Event) {
  const theme = (event.target as HTMLSelectElement | null)?.value;

  if (!theme) {
    return;
  }

  if (theme === 'auto') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', theme);
  }

  applyTheme();
}

function changeLanguage(event: Event) {
  const language = (event.target as HTMLSelectElement | null)?.value;

  if (!language) {
    return;
  }

  localStorage.setItem('language', language);
  i18next.changeLanguage(language);
  currentLanguage.value = language;
}

const currentTheme = localStorage.getItem('theme') ?? 'auto';
const currentLanguage = ref(getLanguage());
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2>{{ $t('tabs.settings') }}</h2>
    <div class="flex flex-col gap-2">
      <StyledSelect
        id="language-selector"
        @change="changeLanguage($event)"
        :value="currentLanguage"
        :label="$t('settings.language.label')"
      >
        <option value="en">{{ $t('settings.language.options.en') }}</option>
        <option value="fi">{{ $t('settings.language.options.fi') }}</option>
      </StyledSelect>

      <div>
        <StyledSelect
          id="theme-selector"
          @change="onThemeChange($event)"
          :value="currentTheme"
          :label="$t('settings.theme.label')"
        >
          <option value="auto">{{ $t('settings.theme.options.auto') }}</option>
          <option value="light">{{ $t('settings.theme.options.light') }}</option>
          <option value="dark">{{ $t('settings.theme.options.dark') }}</option>
        </StyledSelect>
      </div>
    </div>
  </div>
</template>
