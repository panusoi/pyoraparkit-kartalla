import { ref } from 'vue';
import type { Language, LocationMode, Theme } from '../types/settings.types';
import {
  getLanguage,
  getLocationHighAccuracy,
  getLocationMode,
  getTheme,
} from '../utils/readSettings';
import type { SettingKey } from '../constants/settings.constants';

const language = ref<Language>(getLanguage());

const theme = ref<Theme>(getTheme());

const locationMode = ref<LocationMode>(getLocationMode());

const locationHighAccuracy = ref<boolean>(getLocationHighAccuracy());

function reload(props: Partial<Record<SettingKey, boolean>>) {
  if (props.LANGUAGE) {
    language.value = getLanguage();
  }
  if (props.THEME) {
    theme.value = getTheme();
  }
  if (props.LOCATION_MODE) {
    locationMode.value = getLocationMode();
  }
  if (props.LOCATION_HIGH_ACCURACY) {
    locationHighAccuracy.value = getLocationHighAccuracy();
  }
}

export default function useSettings() {
  return { language, theme, locationMode, locationHighAccuracy, reload };
}
