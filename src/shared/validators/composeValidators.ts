import { ITranslateObject, ITranslateKey } from 'services/i18n';

type Validator = (value: string) => string | ITranslateObject | ITranslateKey | undefined;

export function composeValidators(...validators: Validator[]) {
  return (value: string) => validators.reduce((error, validator) => error || validator(value), void 0);
}
