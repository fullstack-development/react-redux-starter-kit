export function makeMaxCharactersValidator(maxCharacters: number, fieldName?: string) {
  return (validatedValue: string) => {
    if (validatedValue.length > maxCharacters) {
      const field = fieldName || 'The field';
      return `${field} can be max ${maxCharacters} characters long`;
    }
    return void 0;
  };
}
