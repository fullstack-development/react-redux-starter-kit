import { Reducer } from 'redux';

import { IAction } from 'shared/types/redux';
import { FieldsState } from './namespace';

type ToucheFieldAction<F extends string> = IAction<string, F>;

function makeToucheFieldsReducer<A extends ToucheFieldAction<A['payload']>>(actionName: A['type']) {
  return <T extends FieldsState<A['payload']>>(initial: T) => {
    return ((state = initial, action: A) => {
      switch (action.type) {
        case actionName: {
          const nextState: T = { ...state as object } as T;
          nextState[action.payload] = {
            ...(nextState[action.payload] as any),
            touched: true,
          };
          return nextState;
        }
        default: {
          return state;
        }
      }
    }) as Reducer<T>;
  };
}

export default makeToucheFieldsReducer;
