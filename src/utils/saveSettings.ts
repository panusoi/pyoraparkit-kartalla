import useSettings from '../composables/useSettings';
import {
  isLanguage,
  isLocationMode,
  isTheme,
  type SetSetting,
  type SetSettingBoolean,
} from '../types/settings.types';

const { reload } = useSettings();

export function setSetting<T extends string>({ key, value, isValid }: SetSetting<T>) {
  if (!isValid(value)) {
    return false;
  }
  localStorage.setItem(key, value);
  reload({ [key]: true });
  return true;
}

export function setSettingBoolean({ key, value }: SetSettingBoolean) {
  if (value !== 'true' && value !== 'false') {
    return false;
  }
  localStorage.setItem(key, value);
  reload({ [key]: true });
  return true;
}

export function setLanguage(value: string) {
  return setSetting({
    key: 'LANGUAGE',
    value,
    isValid: isLanguage,
  });
}

export function setTheme(value: string) {
  return setSetting({
    key: 'THEME',
    value,
    isValid: isTheme,
  });
}

export function setLocationMode(value: string) {
  return setSetting({
    key: 'LOCATION_MODE',
    value,
    isValid: isLocationMode,
  });
}

export function setLocationHighAccuracy(value: string) {
  return setSettingBoolean({
    key: 'LOCATION_HIGH_ACCURACY',
    value,
  });
}
