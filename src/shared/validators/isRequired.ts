export function isRequired(value: string) {
  return !value ? 'Field is required' : undefined;
}
