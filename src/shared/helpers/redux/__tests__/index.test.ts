import { composeReducers, isSuccessedByState, makeIdentityReducer, makeResetStateReducer } from '..';

describe('(shared) Redux helpers', () => {
  describe('composeReducers', () => {
    it('every passed reducer should be called from right to the left', () => {
      const reducers = [
        jest.fn(() => 1),
        jest.fn(() => 2),
        jest.fn(() => 3),
      ];
      const action = { type: 'ACTION' };
      const composedReducers = composeReducers(reducers);
      expect(composedReducers(0, action)).toEqual(1);
      reducers.forEach(x => expect(x).toHaveBeenCalled());
    });
  });

  describe('isSuccessedByState', () => {
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

  describe('makeIdentityReducer', () => {
    it('should return current state', () => {
      const state = { x: 0 };
      const identityReducer = makeIdentityReducer(state);
      expect(identityReducer(state)).toBe(state);
    });
  });

  describe('makeResetStateReducer', () => {
    const initialState = { x: 0 };
    const currentState = { x: 1 };
    const resetAction = { type: 'RESET' };
    const resetStateReducer = makeResetStateReducer(resetAction.type, initialState);

    it('should not reset state if dispatched action is not reset action', () => {
      const newState = resetStateReducer(currentState, { type: 'ACTION' });
      expect(newState.x).toEqual(currentState.x);
    });

    it('should reset state if dispatched action is reset action', () => {
      const newState = resetStateReducer(currentState, resetAction);
      expect(newState.x).toEqual(initialState.x);
    });
  });
});
