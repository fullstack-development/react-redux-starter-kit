import { Reducer } from 'redux';
import { FieldValidator, IAction } from './namespace';

type ReduxFieldValidators<S> = Partial<{ [K in keyof S]: FieldValidator<S[K]> }>;

interface IEditFieldsAction<K extends string> extends IAction {
  payload: {
    field: K;
    value: any;
    error?: string;
  };
}

export default function makeEditFieldsReducer<
  A extends IEditFieldsAction<keyof S>, S extends {[K in A['payload']['field']]: S[K]}
>(
  actionType: A['type'], initialState: S, validators?: ReduxFieldValidators<Pick<S, A['payload']['field']>>,
): Reducer<S> {
  return ((prevState: S = initialState, action: A): S => {
    switch (action.type) {
      case actionType: {
        const nextState = { ...prevState as any } as S;
        const { error, field, value } = action.payload;

        const resError: string = (() => {
          if (error) {
            return error;
          } else {
            const validator = validators && validators[field];
            return validator ? validator({ ...nextState[field] as any, value }, prevState) : '';
          }
        })();

        nextState[field] = { ...nextState[field] as any, value, error: resError };
        return nextState;
      }
      default: {
        return prevState;
      }
    }
  }) as Reducer<S>;
}
