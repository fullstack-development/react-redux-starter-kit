import { getErrorMsg, makeFeatureEntry } from '..';

describe('(shared) Helpers', () => {
  describe('getErrorMsg', () => {
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

  describe('makeFeatureEntry', () => {
    it('should return object with containers, actions, selectors, reducers and sagas', () => {
      const containers = {};
      const actions = {};
      const selectors = {};
      const reduxEntry = {
        reducers: {},
        sagas: [],
      };
      const featureEntry = makeFeatureEntry(containers, actions, selectors, reduxEntry);
      expect(featureEntry.containers).toBe(containers);
      expect(featureEntry.actions).toBe(actions);
      expect(featureEntry.selectors).toBe(selectors);
      expect(featureEntry.reducers).toBe(reduxEntry.reducers);
      expect(featureEntry.sagas).toBe(reduxEntry.sagas);
    });
  });
});
