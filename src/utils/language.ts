import i18next from 'i18next';

const LANGUAGE_KEY = 'language';

const DEFAULT_LANGUAGE = 'en';

export function getLanguage() {
  return localStorage.getItem(LANGUAGE_KEY) ?? DEFAULT_LANGUAGE;
}

export function changeLanguage(language: string) {
  if (language === DEFAULT_LANGUAGE) {
    localStorage.removeItem(LANGUAGE_KEY);
  } else {
    localStorage.setItem(LANGUAGE_KEY, language);
  }
  i18next.changeLanguage(language);
}
