import { IAction } from 'shared/types/redux';
import * as Polyglot from 'node-polyglot';

export interface IReduxState {
  data: {
    currentLocale: Lang;
  };
}

export type ITranslateFunction = Polyglot['t'];

export type Lang = 'en' | 'ru';

export interface ITranslateProps {
  locale: Lang;
  t: ITranslateFunction;
}

export type IChangeLanguage = IAction<'I18N_SERVICE:CHANGE_LANGUAGE', Lang>;

export type Action = IChangeLanguage;
