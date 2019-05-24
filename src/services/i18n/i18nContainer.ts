// tslint:disable: import-blacklist
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { default as languageDetector } from 'i18next-browser-languagedetector';

import { FALLBACK_LANGUAGE } from './constants';
import { en, ru } from './locales';
import { ITranslateObject } from './namespace';
import { ITranslateKey, isTranslateGetKey } from './helpers';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

const initializeI18n = () => {
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

  const originalTranslator = i18n.t.bind(i18n);
  i18n.t = ((key: string | string[] | ITranslateObject | ITranslateKey, options: {}) => {
    if (typeof key !== 'string' && !Array.isArray(key) && !isTranslateGetKey(key)) {
      return originalTranslator(
        isTranslateGetKey(key.key) ? key.key.getKey() : key.key, { ...key.options, ...options },
      );
    }
    if (isTranslateGetKey(key)) {
      return originalTranslator(key.getKey(), options);
    }
    return originalTranslator(key, options);
  }) as i18next.TFunction;
};

export { initializeI18n };
