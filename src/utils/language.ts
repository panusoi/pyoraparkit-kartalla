import { DEFAULTS } from '../constants/settings.constants';

export function getDefaultLanguage() {
  if ('languages' in navigator) {
    for (const language of navigator.languages) {
      if (language === 'fi-FI' || language === 'fi') {
        return 'fi';
      }

      if (language === 'en') {
        return 'en';
      }
    }
  }

  return DEFAULTS.LANGUAGE;
}
