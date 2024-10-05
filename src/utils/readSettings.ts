import { DEFAULTS } from '../constants/settings.constants';
import {
  isLanguage,
  isLocationMode,
  isTheme,
  type ReadBooleanSetting,
  type ReadSetting,
} from '../types/settings.types';

export function readSetting<T extends string>({ key, defaultValue, isValid }: ReadSetting<T>): T {
  const value = localStorage.getItem(key);
  return value && isValid(value) ? value : defaultValue;
}

export function readBooleanSetting({ key, defaultValue }: ReadBooleanSetting): boolean {
  const value = localStorage.getItem(key);

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return defaultValue;
}

export function getLanguage() {
  return readSetting({
    key: 'LANGUAGE',
    defaultValue: DEFAULTS.LANGUAGE,
    isValid: isLanguage,
  });
}

export function getTheme() {
  return readSetting({
    key: 'THEME',
    defaultValue: DEFAULTS.THEME,
    isValid: isTheme,
  });
}

export function getLocationMode() {
  return readSetting({
    key: 'LOCATION_MODE',
    defaultValue: DEFAULTS.LOCATION_MODE,
    isValid: isLocationMode,
  });
}

export function getLocationHighAccuracy(): boolean {
  return readBooleanSetting({
    key: 'LOCATION_HIGH_ACCURACY',
    defaultValue: DEFAULTS.LOCATION_HIGH_ACCURACY,
  });
}
