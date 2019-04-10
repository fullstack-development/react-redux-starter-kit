import { ITranslateObject } from 'services/i18n';

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isTranslateObject(value: string | ITranslateObject): value is ITranslateObject {
  return typeof value === 'object' && Boolean(value.key) && Boolean(value.options);
}
