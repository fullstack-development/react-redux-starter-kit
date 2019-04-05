import { makeIdentityReducer } from '..';

describe('(shared/helpers/redux) makeIdentityReducer', () => {
  it('should return current state', () => {
    const state = { x: 0 };
    const identityReducer = makeIdentityReducer(state);
    expect(identityReducer(state)).toBe(state);
  });
});
