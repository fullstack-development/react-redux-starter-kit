import { ITranslateObject } from 'services/i18n';

export function makeRequired(errorMsg: string | ITranslateObject) {
  return (value: string) => !value ? errorMsg : undefined;
}
