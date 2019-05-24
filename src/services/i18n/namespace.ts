// tslint:disable: import-blacklist
import i18next from 'i18next';
import reactI18Next from 'react-i18next';
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

export interface IUseTranslationRes {
  t: TranslateFunction;
  i18n: i18next.i18n;
  ready: boolean;
}

export type UseTranslation = (
  ns?: reactI18Next.Namespace,
  options?: reactI18Next.UseTranslationOptions,
) => IUseTranslationRes;

export interface ITranslateObject {
  key: string | ITranslateKey;
  options: i18next.TOptions;
}
