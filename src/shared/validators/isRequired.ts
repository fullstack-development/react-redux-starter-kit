export function isRequired(value: any) {
  return !value ? 'Field is required' : undefined;
}
