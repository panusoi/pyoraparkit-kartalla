import type { SettingKeyLiteral, SettingKeyBoolean } from '../constants/settings.constants';

export type ReadSetting<T extends string> = {
  key: SettingKeyLiteral;
  defaultValue: T;
  isValid: (x: string) => x is T;
};

export type ReadBooleanSetting = {
  key: SettingKeyBoolean;
  defaultValue: boolean;
};

export type SetSetting<T extends string> = {
  key: SettingKeyLiteral;
  value: string;
  isValid: (x: string) => x is T;
};

export type SetSettingBoolean = {
  key: SettingKeyBoolean;
  value: string;
};

export const languageOptions = ['en', 'fi'] as const;

export function isLanguage(value: string): value is Language {
  return languageOptions.includes(value as Language);
}

export type Language = (typeof languageOptions)[number];

export const themeOptions = ['auto', 'light', 'dark'] as const;

export function isTheme(value: string): value is Theme {
  return themeOptions.includes(value as Theme);
}

export type Theme = (typeof themeOptions)[number];

export const locationModeOptions = ['auto', 'manual'] as const;

export function isLocationMode(value: string): value is LocationMode {
  return locationModeOptions.includes(value as LocationMode);
}

export type LocationMode = (typeof locationModeOptions)[number];
