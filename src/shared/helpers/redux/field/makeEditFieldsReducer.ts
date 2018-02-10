import { IAction } from 'shared/types/redux';
import { Validator, FieldsState } from '../namespace';
import { Reducer } from 'redux';

type Validators<S> = Partial<{[K in keyof S]: Validator<S[K]> }>;

type EditFieldsReducerAction<F = string> = IAction<string, { field: F, value: any, error?: string }>;

function makeEditFieldsReducer<A extends EditFieldsReducerAction<A['payload']['field']>>(actionType: A['type']) {
  type Field = A['payload']['field'];
  return <S extends FieldsState<Field>>(initialState: S, validators?: Validators<Pick<S, Field>>): Reducer<S> => {
    return ((state: S = initialState, action: A): S => {
      switch (action.type) {
        case actionType: {
          const { error, field, value } = action.payload;

          const resError: string = (() => {
            if (error) {
              return error;
            } else {
              const validator = validators ? validators[field] : void 0;

              return validator ? validator({ ...state[field] as any, value }, state[field]) : '';
            }
          })();

          return { ...state[field] as any, value, error: resError };
        }
        default: {
          return state;
        }
      }
    }) as Reducer<S>;
  };
}

export default makeEditFieldsReducer;
