<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { changeTheme, getTheme } from '../../utils/theme';
import StyledSelect from '../../components/Form/StyledSelect.vue';
import { ref, watch, watchEffect } from 'vue';
import { changeLanguage, getLanguage } from '../../utils/language';
import {
  changeLocationHighAccuracy,
  changeLocationMode,
  getLocationHighAccuracy,
  getLocationMode,
} from '../../utils/location';
import { useGeolocation } from '../../composables/useGeolocation';

const { reset: resetGeolocation } = useGeolocation();

const themeSelector = ref(getTheme());
const languageSelector = ref(getLanguage());
const locationModeSelector = ref(getLocationMode());
const locationHighAccuracySelector = ref(`${getLocationHighAccuracy()}`);

watchEffect(() => {
  changeTheme(themeSelector.value);
});

watchEffect(() => {
  changeLanguage(languageSelector.value);
});

watch(locationModeSelector, () => {
  changeLocationMode(locationModeSelector.value);
  resetGeolocation();
});

watch(locationHighAccuracySelector, () => {
  changeLocationHighAccuracy(locationHighAccuracySelector.value);
  resetGeolocation();
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
      >
        <option value="en">{{ $t('settings.language.options.en') }}</option>
        <option value="fi">{{ $t('settings.language.options.fi') }}</option>
      </StyledSelect>

      <StyledSelect v-model="themeSelector" id="theme-selector" :label="$t('settings.theme.label')">
        <option value="auto">{{ $t('settings.theme.options.auto') }}</option>
        <option value="light">{{ $t('settings.theme.options.light') }}</option>
        <option value="dark">{{ $t('settings.theme.options.dark') }}</option>
      </StyledSelect>

      <StyledSelect
        v-model="locationModeSelector"
        id="location-mode-selector"
        :label="$t('settings.locationMode.label')"
      >
        <option value="auto">{{ $t('settings.locationMode.options.auto') }}</option>
        <option value="manual">{{ $t('settings.locationMode.options.manual') }}</option>
      </StyledSelect>

      <StyledSelect
        v-model="locationHighAccuracySelector"
        id="location-mode-selector"
        :label="$t('settings.locationHighAccuracy.label')"
      >
        <option value="true">{{ $t('settings.locationHighAccuracy.options.true') }}</option>
        <option value="false">{{ $t('settings.locationHighAccuracy.options.false') }}</option>
      </StyledSelect>
    </div>
  </div>
</template>
