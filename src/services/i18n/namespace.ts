import { IGetKey } from './helpers/buildTranslationKeys';

export interface IExtendedTranslateKey extends IGetKey {
  key: string;
  options: {};
}
