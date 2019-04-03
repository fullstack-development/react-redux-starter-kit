import { isSuccessedByState } from '..';

describe('(shared/helpers/redux) isSuccessedByState', () => {
  const requestingWithError = {
    isRequesting: true,
    error: 'error',
  };
  const requestingWithoutError = {
    isRequesting: true,
    error: '',
  };
  const withError = {
    isRequesting: false,
    error: 'error',
  };
  const withoutError = {
    isRequesting: false,
    error: '',
  };

  it('should return true if prev is requesting and next is not requesting and without error', () => {
    expect(isSuccessedByState(requestingWithoutError, withoutError)).toBe(true);
    expect(isSuccessedByState(requestingWithError, withoutError)).toBe(true);
  });

  it('should return false otherwise', () => {
    expect(isSuccessedByState(requestingWithError, requestingWithError)).toBe(false);
    expect(isSuccessedByState(requestingWithError, requestingWithoutError)).toBe(false);
    expect(isSuccessedByState(requestingWithError, withError)).toBe(false);

    expect(isSuccessedByState(requestingWithoutError, requestingWithError)).toBe(false);
    expect(isSuccessedByState(requestingWithoutError, requestingWithoutError)).toBe(false);
    expect(isSuccessedByState(requestingWithoutError, withError)).toBe(false);

    expect(isSuccessedByState(withError, requestingWithError)).toBe(false);
    expect(isSuccessedByState(withError, requestingWithoutError)).toBe(false);
    expect(isSuccessedByState(withError, withError)).toBe(false);
    expect(isSuccessedByState(withError, withoutError)).toBe(false);

    expect(isSuccessedByState(withoutError, requestingWithError)).toBe(false);
    expect(isSuccessedByState(withoutError, requestingWithoutError)).toBe(false);
    expect(isSuccessedByState(withoutError, withError)).toBe(false);
    expect(isSuccessedByState(withoutError, withoutError)).toBe(false);
  });
});
