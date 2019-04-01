import { KeysToValuesFormattersMap } from 'shared/types/common';
 // TODO: write tests
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
