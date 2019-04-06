import { replaceObjectKeys } from '../';

const sourceObj: any = { a: 12, b: 'lmao', c: [1, 2] };
const replacementMap: any = { a: 'renamed a', b: 'ggg', c: 'd' };
const resultObj: any = replaceObjectKeys(sourceObj, replacementMap);

describe('(shared/helpers) replaceObjectKeys', () => {
  it('should replace object keys according to provided map', () => {
    const sourceKeys = Object.keys(sourceObj);
    sourceKeys.forEach((sourceKey: string) => {
      const replacedKey = replacementMap[sourceKey];
      expect(resultObj[replacedKey]).toEqual(sourceObj[sourceKey]);
    });
  });

  it('should not add any new fields', () => {
    expect(Object.keys(resultObj).length).toBe(Object.keys(sourceObj).length);
  });
});
