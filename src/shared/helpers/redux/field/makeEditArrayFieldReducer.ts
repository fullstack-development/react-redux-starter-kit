import { Reducer } from 'redux';

import { IAction, IReduxField } from 'shared/types/redux';
import { Validator } from '../namespace';

type ActionType<AT, RT, UT, UPI>
  = IAddAction<AT> | IRemoveAction<RT> | IUpdateAction<UT, UPI>;

type IAddAction<T> = IAction<T, any>;

type IRemoveAction<T> = IAction<T, number>;

interface IUpdatePayload<T> {
  index: number;
  item: T;
}

type IUpdateAction<T, PI> = IAction<T, IUpdatePayload<PI>>;

export default function makeArrayFieldReducer<AT, UT, RT, T>(
  addType: AT,
  removeType: RT,
  updateType: UT,
  initial: IReduxField<T[]>,
  validator?: Validator<T[]>,
): Reducer<IReduxField<T[]>> {
  return function arrayFieldReducer(
    state: IReduxField<T[]> = initial, action: ActionType<AT, RT, UT, T>,
  ): IReduxField<T[]> {
    switch (action.type) {
      case addType: {

        const nextValue = [...state.value, action.payload];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, error, value: nextValue };
      }
      case removeType: {
        const payload = action.payload as IRemoveAction<RT>['payload'];
        const nextValue = [
          ...state.value.slice(0, payload),
          ...state.value.slice(payload + 1),
        ];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, error, value: nextValue };
      }
      case updateType: {
        const { index, item } = action.payload as IUpdatePayload<T>;
        const nextValue = [...state.value.slice(0, index), item, ...state.value.slice(index + 1)];
        const error = validator ? validator(nextValue, state.value) : '';

        return { ...state, value: nextValue, error };
      }

      default: return state;
    }
  } as Reducer<IReduxField<T[]>>;
}
