import { default as i18n } from 'i18next';
import { reactI18nextModule, withNamespaces as withI18n, WithNamespaces as ITranslateProps } from 'react-i18next';
import { default as languageDetector } from 'i18next-browser-languagedetector';

import { en, ru } from 'shared/locales';
import buildTranslationKeys from 'shared/helpers/buildTranslationKeys';

import { FALLBACK_LANGUAGE } from './constants';

const tKeys = buildTranslationKeys(en);
const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
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

export { tKeys, withI18n, ITranslateProps };
export default i18n;
