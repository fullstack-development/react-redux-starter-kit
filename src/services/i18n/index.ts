import i18next from 'i18next';
import { withTranslation, WithTranslation, useTranslation } from 'react-i18next';
import { tKeys } from './constants';
import { default as LanguageSelector } from './view/LanguageSelector/LanguageSelector';

type TranslateFunction = i18next.TFunction;
export {
  tKeys, withTranslation, WithTranslation, useTranslation, LanguageSelector, TranslateFunction,
};
