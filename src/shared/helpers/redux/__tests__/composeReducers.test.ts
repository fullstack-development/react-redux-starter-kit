import { composeReducers } from '..';

describe('(shared/helpers/redux) composeReducers', () => {
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
