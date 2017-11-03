import { IAction } from './namespace';

export default function makeResetStateReducer<A extends IAction>(actionType: A['type']) {
  return <S>(initialState: S) => {
    return (state: S, action: A) => action.type === actionType ? initialState : state;
  };
}
