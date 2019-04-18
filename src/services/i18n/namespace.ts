// tslint:disable-next-line: import-blacklist
import i18next from 'i18next';

export interface IExtendedTranslateKey {
  key: string;
  options: {};
}

export type TranslateFunction = i18next.TFunction;

export interface ITranslateObject {
  key: string;
  options: i18next.TOptions;
}
