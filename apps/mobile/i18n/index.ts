import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import el from './el.json';
import en from './en.json';

void i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    el: { translation: el },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
