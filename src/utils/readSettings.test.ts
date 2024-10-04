import { describe, it, expect, beforeEach } from 'vitest';
import { getLanguage, getLocationHighAccuracy, getLocationMode, getTheme } from './readSettings';
import { DEFAULTS } from '../constants/settings.constants';

describe('read settings utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const setNonDefaultSettings = () => {
    localStorage.setItem('LANGUAGE', 'fi');
    localStorage.setItem('THEME', 'dark');
    localStorage.setItem('LOCATION_MODE', 'manual');
    localStorage.setItem('LOCATION_HIGH_ACCURACY', 'true');
  };

  const setInvalidSettings = () => {
    localStorage.setItem('LANGUAGE', 'invalid-value');
    localStorage.setItem('THEME', 'invalid-value');
    localStorage.setItem('LOCATION_MODE', 'invalid-value');
    localStorage.setItem('LOCATION_HIGH_ACCURACY', 'invalid-value');
  };

  describe.each([
    {
      name: 'getLanguage',
      getter: getLanguage,
      defaultValue: DEFAULTS.LANGUAGE,
    },
    {
      name: 'getTheme',
      getter: getTheme,
      defaultValue: DEFAULTS.THEME,
    },
    {
      name: 'getLanguage',
      getter: getLocationMode,
      defaultValue: DEFAULTS.LOCATION_MODE,
    },
    {
      name: 'getLanguage',
      getter: getLocationHighAccuracy,
      defaultValue: DEFAULTS.LOCATION_HIGH_ACCURACY,
    },
  ])('$name', ({ getter, defaultValue }) => {
    it('returns value if set', () => {
      setNonDefaultSettings();
      expect(getter()).not.toBe(defaultValue);
    });

    it('returns default value if not set', () => {
      expect(getter()).toBe(defaultValue);
    });

    it('returns default value is not valid', () => {
      setInvalidSettings();
      expect(getter()).toBe(defaultValue);
    });
  });
});
