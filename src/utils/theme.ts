const THEME_KEY = 'theme';

const DEFAULT_THEME = 'auto';

export function getTheme() {
  return localStorage.getItem(THEME_KEY) ?? DEFAULT_THEME;
}

export function changeTheme(theme: string) {
  if (theme === DEFAULT_THEME) {
    localStorage.removeItem(THEME_KEY);
  } else {
    localStorage.setItem(THEME_KEY, theme);
  }
  applyTheme();
}

export function applyTheme() {
  if (
    localStorage.getItem(THEME_KEY) === 'dark' ||
    (!(THEME_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
