export function makeMinCharactersValidator(minCharacters: number, errorMsg: string) {
  return (validatedValue: string) => {
    if (validatedValue.length < minCharacters) {
      return errorMsg;
    }
    return void 0;
  };
}
