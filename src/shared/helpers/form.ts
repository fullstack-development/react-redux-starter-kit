export function makeFormFieldNames<T>(names: Array<keyof T>) {
  return names.reduce((acc, name) => {
    return { ...acc, [name]: name };
  }, {}) as Record<keyof T, string>;
}
