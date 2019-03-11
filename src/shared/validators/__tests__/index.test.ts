import { isRequired, makeMaxCharactersValidator, makeMinCharactersValidator, composeValidators } from '../';

describe('(shared) Validators', () => {
  describe('composeValidators', () => {
    const mockValidators = Array(5).fill(jest.fn());
    const composedValidator = composeValidators(...mockValidators);
    it('should return first failed validator error message', () => {
      mockValidators[0].mockReturnValueOnce('err1');
      expect(composedValidator('')).toBe('err1');
      mockValidators[1].mockReturnValueOnce('err2');
      expect(composedValidator('')).toBe('err2');
      mockValidators[2].mockReturnValueOnce('err3');
      expect(composedValidator('')).toBe('err3');
    });

    it('should return undefined if all validators run successful', () => {
      mockValidators[0].mockReturnValue(undefined);
      mockValidators[1].mockReturnValue(undefined);
      mockValidators[2].mockReturnValue(undefined);
      expect(composedValidator('')).toBe(undefined);
    });
  });

  describe('isRequired validator', () => {
    it('should return error message if value is empty', () => {
      expect(typeof isRequired('')).toBe('string');
    });

    it('should return undefined if value is not empty', () => {
      expect(typeof isRequired('value')).toBe('undefined');
    });
  });

  describe('maxCharacters validator', () => {
    const validateMaxCharacters = makeMaxCharactersValidator(5);
    it('should return error message if max characters is exceeded', () => {
      expect(typeof validateMaxCharacters('123456')).toBe('string');
    });

    it('should return undefined if max characters is not exceeded', () => {
      expect(typeof validateMaxCharacters('12345')).toBe('undefined');
    });
  });

  describe('minCharacters validator', () => {
    const validateMinCharacters = makeMinCharactersValidator(5);
    it('should return error message if min characters is not reached', () => {
      expect(typeof validateMinCharacters('12')).toBe('string');
    });

    it('should return undefined if min characters is reached', () => {
      expect(typeof validateMinCharacters('12345')).toBe('undefined');
    });
  });
});
