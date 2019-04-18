// tslint:disable-next-line: import-blacklist
import { withTranslation, WithTranslation, useTranslation } from 'react-i18next';
import { tKeys } from './constants';
import { default as LanguageSelector } from './view/LanguageSelector/LanguageSelector';

export { ITranslateKey, IConcatKey } from './helpers/buildTranslationKeys';
export { TranslateFunction, ITranslateObject } from './namespace';
export {
  tKeys, withTranslation, WithTranslation as TranslationProps, useTranslation, LanguageSelector,
};
