import { ITranslateObject } from 'services/i18n';

export function makeMinCharactersValidator(minCharacters: number, errorMsg: string | ITranslateObject) {
  return (validatedValue: string) => {
    if (validatedValue.length < minCharacters) {
      return errorMsg;
    }
    return void 0;
  };
}
