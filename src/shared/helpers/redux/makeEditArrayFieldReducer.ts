import { Reducer } from 'redux';

import { IActionWithPayload, IReduxField, Validator } from './namespace';

type ActionType<T> = ActionAdd<T> | ActionRemove | ActionUpdate<T>;

type ActionAdd<T> = IActionWithPayload<T>;

type ActionRemove = IActionWithPayload<number>;

type ActionUpdate<T> = IActionWithPayload<{ index: number; item: T }>;

export default function makeArrayFieldReducer<
  A extends ActionAdd<T>, R extends ActionRemove, U extends ActionUpdate<T>, T
>(
  addType: A['type'],
  removeType: R['type'],
  updateType: U['type'],
  initial: IReduxField<T[]>,
  validator?: Validator<T[]>,
): Reducer<IReduxField<T[]>> {
  return function arrayFieldReducer(state: IReduxField<T[]> = initial, action: ActionType<T>): IReduxField<T[]> {
    switch (action.type) {
      case addType: {
        const nextValue = [...state.value, action.payload as T];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, error, value: nextValue };
      }
      case removeType: {
        const payload = action.payload as ActionRemove['payload'];
        const nextValue = [
          ...state.value.slice(0, payload),
          ...state.value.slice(payload + 1),
        ];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, error, value: nextValue };
      }
      case updateType: {
        const { index, item } = action.payload as { index: number; item: T };
        const nextValue = [...state.value.slice(0, index), item, ...state.value.slice(index + 1)];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, value: nextValue, error };
      }

      default: return state;
    }
  } as Reducer<IReduxField<T[]>>;
}
