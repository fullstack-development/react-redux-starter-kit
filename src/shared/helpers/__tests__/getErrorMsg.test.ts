import { getErrorMsg } from '..';

describe('(shared/helpers) getErrorMsg', () => {
  it('should return error message from Error instance', () => {
    const errorMessage = 'error!!';
    expect(getErrorMsg(new Error(errorMessage))).toBe(errorMessage);
  });

  it('should return string error from non Error instance', () => {
    const stringError = 'error!!';
    const objError = {
      toString: () => stringError,
    };
    const numError = 322;
    expect(getErrorMsg(stringError)).toBe(stringError);
    expect(getErrorMsg(objError)).toBe(stringError);
    expect(getErrorMsg(numError)).toBe(String(numError));
  });
});
