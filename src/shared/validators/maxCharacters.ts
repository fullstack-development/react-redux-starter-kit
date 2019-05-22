export function makeMaxCharactersValidator<T>(maxCharacters: number, errorMsg: T) {
  return (validatedValue: string) => {
    if (validatedValue.length > maxCharacters) {
      return errorMsg;
    }
    return void 0;
  };
}
