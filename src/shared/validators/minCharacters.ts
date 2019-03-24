export function makeMinCharactersValidator(minCharacters: number, fieldName?: string) {
  return (validatedValue: string) => {
    if (validatedValue.length < minCharacters) {
      const field = fieldName || 'The field';
      return `${field} must be at least ${minCharacters} characters long`;
    }
    return void 0;
  };
}
