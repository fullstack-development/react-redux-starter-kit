export function makeRequired<T>(errorMsg: T) {
  return (value: string) => !value ? errorMsg : undefined;
}
