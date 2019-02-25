type Validator = (value: string) => string | undefined;

export function composeValidators(...validators: Validator[]) {
  return (value: string) => validators.reduce((error, validator) => error || validator(value), void 0);
}
