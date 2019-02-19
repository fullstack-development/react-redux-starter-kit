import Polyglot from 'node-polyglot';

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
  changeLanguage(lang: Lang): void;
}
