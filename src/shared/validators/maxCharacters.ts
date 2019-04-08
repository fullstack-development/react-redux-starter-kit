export function makeMaxCharactersValidator(maxCharacters: number, errorMsg: string) {
  return (validatedValue: string) => {
    if (validatedValue.length > maxCharacters) {
      return errorMsg;
    }
    return void 0;
  };
}
