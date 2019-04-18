// tslint:disable-next-line: import-blacklist
import { withTranslation, useTranslation } from 'react-i18next';
import { tKeys } from './constants';
import { default as LanguageSelector } from './view/LanguageSelector/LanguageSelector';

export { ITranslateKey, IConcatKey } from './helpers/buildTranslationKeys';
export { TranslateFunction, ITranslateObject, ITranslationProps } from './namespace';
export { tKeys, withTranslation, useTranslation, LanguageSelector };
