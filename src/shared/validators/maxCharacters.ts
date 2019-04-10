import { ITranslateObject } from 'services/i18n';

export function makeMaxCharactersValidator(maxCharacters: number, errorMsg: string | ITranslateObject) {
  return (validatedValue: string) => {
    if (validatedValue.length > maxCharacters) {
      return errorMsg;
    }
    return void 0;
  };
}
