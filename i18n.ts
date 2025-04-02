import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import common_es from './locales/es/common.json';
import common_en from './locales/en/common.json';
import login_es from './locales/es/login.json';
import login_en from './locales/en/login.json';

const resources = {
  es: { login: login_es, common: common_es },
  en: { login: login_en, common: common_en },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageTag.split('-')[0],
  fallbackLng: 'en',
  ns: ['common', 'login'],
  defaultNS: 'common',
  // debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
