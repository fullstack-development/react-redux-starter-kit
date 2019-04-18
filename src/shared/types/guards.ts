import { ITranslateKey, ITranslateObject } from 'services/i18n';

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isTranslateGetKey(value: string | string[] | ITranslateObject | ITranslateKey): value is ITranslateKey {
  if (typeof value === 'object' && 'getKey' in value && typeof value.getKey === 'function') {
    return true;
  }
  return false;
}
