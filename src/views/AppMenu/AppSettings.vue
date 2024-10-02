<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { changeTheme, getTheme } from '../../utils/theme';
import StyledSelect from '../../components/Form/StyledSelect.vue';
import { ref, watchEffect } from 'vue';
import { changeLanguage, getLanguage } from '../../utils/language';

const themeSelector = ref(getTheme());
const languageSelector = ref(getLanguage());

watchEffect(() => {
  changeTheme(themeSelector.value);
});

watchEffect(() => {
  changeLanguage(languageSelector.value);
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
    </div>
  </div>
</template>
