import { replaceObjectValues, KeysToValuesFormattersMap } from '../';

const sourceObj = { a: 12, b: 'lmao', c: [1, 2] };

describe('(shared/helpers) replaceObjectValues', () => {
  it('should apply passed formatters to object values', () => {
    const formatters: KeysToValuesFormattersMap<typeof sourceObj> = {
      a: x => x * 2,
      b: x => x.toUpperCase(),
      c: x => x.reduce(acc => acc + 1),
    };
    const resultObj = replaceObjectValues(sourceObj, formatters);
    expect(resultObj.a).toBe(formatters.a!(sourceObj.a));
    expect(resultObj.b).toBe(formatters.b!(sourceObj.b));
    expect(resultObj.c).toBe(formatters.c!(sourceObj.c));
  });

  it('should not change values with no corresponding formatters', () => {
    const formatters: KeysToValuesFormattersMap<typeof sourceObj> = {
      a: x => x * 2,
    };
    const resultObj = replaceObjectValues(sourceObj, formatters);
    expect(resultObj.a).toBe(formatters.a!(sourceObj.a));
    expect(resultObj.b).toBe(sourceObj.b);
    expect(resultObj.c).toBe(sourceObj.c);
  });

  it('should not add any new fields', () => {
    const resultObj = replaceObjectValues(sourceObj, {});
    expect(Object.keys(resultObj).length).toBe(Object.keys(sourceObj).length);
  });
});
