export function getLanguage() {
  return localStorage.getItem('language') ?? 'en';
}
