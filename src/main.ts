import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import en from './locales/en.json';
import fi from './locales/fi.json';

const app = createApp(App);

i18next.init({
  lng: 'en',
  defaultNS: 'app',
  resources: {
    en,
    fi,
  },
});

app.use(I18NextVue, { i18next });
app.mount('#app');
