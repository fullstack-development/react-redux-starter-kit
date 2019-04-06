import * as R from 'ramda';

function replaceObjectKeys<T extends Record<string, any>>(oldObj: T, oldToNewKeysMap: Record<keyof T, string>) {
  return Object.keys(oldObj).reduce((newObj: Record<string, any>, key: string) => {
    return R.assoc(oldToNewKeysMap[key], oldObj[key], newObj);
  }, {});
}

export default replaceObjectKeys;
