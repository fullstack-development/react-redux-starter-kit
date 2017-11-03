import { IAction } from './namespace';

export default function makeResetStateReducer<A extends IAction, S>(type: A['type'], initialState: S) {
  return (state: S, action: A) => action.type === type ? initialState : state;
}
