import { ITranslateKey, ITranslateObject } from 'services/i18n';

export function isTranslateGetKey(value: string | string[] | ITranslateObject | ITranslateKey): value is ITranslateKey {
  if (typeof value === 'object' && 'getKey' in value && typeof value.getKey === 'function') {
    return true;
  }
  return false;
}
