<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import StyledSelect from '../../components/Form/StyledSelect.vue';
import { ref, watch } from 'vue';
import {
  getLanguage,
  getLocationHighAccuracy,
  getLocationMode,
  getTheme,
} from '../../utils/readSettings';
import {
  setLanguage,
  setLocationHighAccuracy,
  setLocationMode,
  setTheme,
} from '../../utils/saveSettings';

const themeSelector = ref(getTheme());
const languageSelector = ref(getLanguage());
const locationModeSelector = ref(getLocationMode());
const locationHighAccuracySelector = ref(`${getLocationHighAccuracy()}`);

watch(languageSelector, (newValue) => {
  setLanguage(newValue);
});

watch(themeSelector, (newValue) => {
  setTheme(newValue);
});

watch(locationModeSelector, (newValue) => {
  setLocationMode(newValue);
});

watch(locationHighAccuracySelector, (newValue) => {
  setLocationHighAccuracy(newValue);
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2>{{ $t('tabs.settings') }}</h2>
    <div class="flex flex-col gap-2">
      <StyledSelect
        v-model="languageSelector"
        id="language-selector"
        :label="$t('settings.language.label')"
        data-testid="language-selector"
      >
        <option value="en">{{ $t('settings.language.options.en') }}</option>
        <option value="fi">{{ $t('settings.language.options.fi') }}</option>
      </StyledSelect>

      <StyledSelect
        v-model="themeSelector"
        id="theme-selector"
        :label="$t('settings.theme.label')"
        data-testid="theme-selector"
      >
        <option value="auto">{{ $t('settings.theme.options.auto') }}</option>
        <option value="light">{{ $t('settings.theme.options.light') }}</option>
        <option value="dark">{{ $t('settings.theme.options.dark') }}</option>
      </StyledSelect>

      <StyledSelect
        v-model="locationModeSelector"
        id="location-mode-selector"
        :label="$t('settings.locationMode.label')"
        data-testid="location-mode-selector"
      >
        <option value="auto">{{ $t('settings.locationMode.options.auto') }}</option>
        <option value="manual">{{ $t('settings.locationMode.options.manual') }}</option>
      </StyledSelect>

      <StyledSelect
        v-model="locationHighAccuracySelector"
        id="location-accuracy-selector"
        :label="$t('settings.locationHighAccuracy.label')"
        data-testid="location-accuracy-selector"
      >
        <option value="true">{{ $t('settings.locationHighAccuracy.options.true') }}</option>
        <option value="false">{{ $t('settings.locationHighAccuracy.options.false') }}</option>
      </StyledSelect>
    </div>
  </div>
</template>
