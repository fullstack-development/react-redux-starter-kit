import { IExtendedTranslateKey } from 'services/i18n';

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isTranslateGetKey(value: string | string[] | IExtendedTranslateKey): value is IExtendedTranslateKey {
  return typeof value !== 'string' && !Array.isArray(value) && typeof value.getKey === 'function';
}
