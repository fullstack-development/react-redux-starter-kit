import { IAction } from 'shared/types/redux';
import * as Polyglot from 'node-polyglot';

export interface IReduxState {
  data: {
    currentLocale: Lang;
  };
}

type CustomTranslateFunction = (phrase: IPhraseWithOptions) => string;
interface IPhraseWithOptions {
  key: string;
  params: Record<string, string | number>;
}

export type ITranslateFunction = Polyglot['t'] & CustomTranslateFunction;
export type ITranslateKey = string | IPhraseWithOptions;

export type Lang = 'en' | 'ru';

export interface ITranslateProps {
  locale: Lang;
  t: ITranslateFunction;
}

export type IChangeLanguage = IAction<'I18N_SERVICE:CHANGE_LANGUAGE', Lang>;

export type Action = IChangeLanguage;
