export function makeRequired(errorMsg: string) {
  return (value: string) => !value ? errorMsg : undefined;
}
