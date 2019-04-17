// tslint:disable: import-blacklist
import i18next from 'i18next';
import { withTranslation, WithTranslation, useTranslation } from 'react-i18next';
import { tKeys } from './constants';
import { default as LanguageSelector } from './view/LanguageSelector/LanguageSelector';

type TranslateFunction = i18next.TFunction;

interface ITranslateObject {
  key: string;
  options: Record<string, string | number | object | string[] | object[] | undefined>;
}

export * from './namespace';
export {
  tKeys, withTranslation, WithTranslation as TranslationProps, useTranslation, LanguageSelector, TranslateFunction,
  ITranslateObject,
};
