import { IEditFieldAction, Validator } from './namespace';

export default function makeEditFieldReducer<A extends IEditFieldAction, S = A['payload']>(
  type: A['type'], initial: S, validator?: Validator<S>,
) {
  return (state: S = initial, action: A) => {
    if (type === action.type) {
      const { payload: { error, value } } = action;
      // error from payload is more important, then error from passed validator
      const resError = validator && !error ? validator(action.payload as any, state) : error;

      return { ...state as any, value, error: resError };
    } else {
      return state;
    }
  };
}
