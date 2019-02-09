import { default as i18n } from 'i18next';
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

export const makeI18nInstance = () => {
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
