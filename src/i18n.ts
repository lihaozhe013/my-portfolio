import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/translation.json';
import zh from '@/locales/zh/translation.json';

const savedLocale =
  typeof window !== 'undefined'
    ? window.localStorage.getItem('portfolio-locale')
    : null;

const initialLocale = savedLocale === 'zh' ? 'zh' : 'en';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: initialLocale,
  fallbackLng: 'en',
  supportedLngs: ['en', 'zh'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
