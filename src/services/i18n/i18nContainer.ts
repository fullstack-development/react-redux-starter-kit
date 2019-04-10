// tslint:disable: import-blacklist
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { default as languageDetector } from 'i18next-browser-languagedetector';

import { FALLBACK_LANGUAGE } from './constants';
import { en, ru } from './locales';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

const initI18n = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: FALLBACK_LANGUAGE,
      interpolation: {
        format: (value, format, _lng) => {
          if (format === 'uppercase') { return value.toUpperCase(); }
          return value;
        },
      },
    });
};

export { initI18n };
