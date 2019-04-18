// tslint:disable-next-line: import-blacklist
import i18next from 'i18next';
import { ITranslateKey } from './helpers/buildTranslationKeys';

export type TranslateFunction = <
  TResult extends string | object | Array<string | object> | undefined = string,
  TKeys extends string | TemplateStringsArray = string,
  TInterpolationMap extends object = { [key: string]: any }
  >(
  key: TKeys | TKeys[] | ITranslateObject | ITranslateKey,
  options?: i18next.TOptions<TInterpolationMap> | string,
) => TResult;

interface IWithTFunction {
  t: TranslateFunction;
}

export interface ITranslationProps extends IWithTFunction {
  i18n: i18next.i18n;
  tReady: boolean;
}

export interface ITranslateObject {
  key: string;
  options: i18next.TOptions;
}
