type ValueFormatter<T> = (x: T) => any;
export type KeysToValuesFormattersMap<T> = Partial<{[K in keyof T]: ValueFormatter<T[K]>}>;

function replaceObjectValues<T extends Record<string, any>>(
  sourceObj: T, replaceMap: KeysToValuesFormattersMap<T>,
) {
  return Object.keys(sourceObj)
    .reduce((newObj, key) => ({
      ...newObj,
      [key]: replaceMap[key] ? replaceMap[key]!(sourceObj[key]) : sourceObj[key],
    }), sourceObj);
}

export default replaceObjectValues;
