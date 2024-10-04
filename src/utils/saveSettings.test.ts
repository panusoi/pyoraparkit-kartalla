import { describe, it, expect, beforeEach } from 'vitest';
import { setLanguage, setLocationHighAccuracy, setLocationMode, setTheme } from './saveSettings';
import { type SettingKey } from '../constants/settings.constants';
import { languageOptions, locationModeOptions, themeOptions } from '../types/settings.types';

describe('save settings utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const expectSetValue = (setter: (value: string) => void, key: SettingKey, value: string) => {
    expect(setter(value)).toBe(true);
    expect(localStorage.getItem(key), `Key: ${key}`).toBe(value);
  };

  const expectIgnoredValue = (setter: (value: string) => void, key: SettingKey, value: string) => {
    expect(setter(value)).toBe(false);
    expect(localStorage.getItem(key), `Key: ${key}`).toBe(null);
  };

  describe.each([
    {
      name: 'setLanguage',
      setter: setLanguage,
      options: languageOptions,
      key: 'LANGUAGE' as const,
    },
    {
      name: 'setTheme',
      setter: setTheme,
      options: themeOptions,
      key: 'THEME' as const,
    },
    {
      name: 'setLocationMode',
      setter: setLocationMode,
      options: locationModeOptions,
      key: 'LOCATION_MODE' as const,
    },
    {
      name: 'setLanguage',
      setter: setLanguage,
      options: languageOptions,
      key: 'LANGUAGE' as const,
    },
  ])('$name', ({ setter, options, key }) => {
    it.each(options)('sets language to %s', (value) => {
      expectSetValue(setter, key, value);
    });
    it('ignores invalid value', () => {
      expectIgnoredValue(setter, key, 'test');
    });
  });

  describe('setLocationHighAccuracy', () => {
    it.each(['true', 'false'])('sets location high accuracy to %s', (value) => {
      expectSetValue(setLocationHighAccuracy, 'LOCATION_HIGH_ACCURACY', value);
    });
    it('ignores invalid value', () => {
      expectIgnoredValue(setLocationHighAccuracy, 'LOCATION_HIGH_ACCURACY', 'test');
    });
  });
});
