import { IPlainAction } from 'shared/types/redux';

export default function makeResetStateReducer<A extends IPlainAction<string>, S>(type: A['type'], initialState: S) {
  return (state: S, action: A) => action.type === type ? initialState : state;
}
