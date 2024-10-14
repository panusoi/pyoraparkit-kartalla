import './assets/main.css';

import { createApp, watchEffect } from 'vue';
import App from './App.vue';

import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import en from './locales/en.json';
import fi from './locales/fi.json';

import useSettings from './composables/useSettings';

const { theme, language } = useSettings();

const app = createApp(App);

i18next.init({
  lng: language.value,
  fallbackLng: 'en',
  defaultNS: 'app',
  resources: {
    en,
    fi,
  },
});

watchEffect(() => {
  if (
    theme.value === 'dark' ||
    (!('THEME' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

watchEffect(() => {
  i18next.changeLanguage(language.value);
  document.querySelector('html')?.setAttribute('lang', language.value);
});

app.use(I18NextVue, { i18next });
app.mount('#app');
