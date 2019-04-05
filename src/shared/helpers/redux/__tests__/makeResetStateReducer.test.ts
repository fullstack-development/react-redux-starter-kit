import { makeResetStateReducer } from '..';

describe('(shared/helpers/redux) makeResetStateReducer', () => {
  const initialState = { x: 0 };
  const currentState = { x: 1 };
  const resetAction = { type: 'RESET' };
  const resetStateReducer = makeResetStateReducer(resetAction.type, initialState);

  it('should reset state if dispatched action is reset action', () => {
    const newState = resetStateReducer(currentState, resetAction);
    expect(newState.x).toEqual(initialState.x);
  });

  it('should not reset state if dispatched action is not reset action', () => {
    const newState = resetStateReducer(currentState, { type: 'ACTION' });
    expect(newState.x).toEqual(currentState.x);
  });
});
