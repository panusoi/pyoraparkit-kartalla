export type SettingKeyLiteral = 'LANGUAGE' | 'THEME' | 'LOCATION_MODE';

export type SettingKeyBoolean = 'LOCATION_HIGH_ACCURACY';

export type SettingKey = SettingKeyLiteral | SettingKeyBoolean;

export const DEFAULTS = {
  LANGUAGE: 'en',
  THEME: 'auto',
  LOCATION_MODE: 'auto',
  LOCATION_HIGH_ACCURACY: false,
} as const satisfies { [k in SettingKeyLiteral]: string } & { [k in SettingKeyBoolean]: boolean };
