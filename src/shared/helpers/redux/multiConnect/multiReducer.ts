import { IMultiInstanceState, IMultiAction } from './namespace';

type Reducer<TReduxState> = (instanceState: TReduxState, action: IMultiAction) => TReduxState;

export function multiReducer<IReduxState>(reducer: Reducer<IReduxState>) {
  return (
    state: IMultiInstanceState<IReduxState> = {},
    action: IMultiAction,
  ): IMultiInstanceState<IReduxState> => {
    const { _instanceKey } = action;
    if (!_instanceKey || !state[_instanceKey]) { return state; }
    const nextInstanceState = reducer(state[_instanceKey], action);
    return { ...state, [_instanceKey]: nextInstanceState };
  };
}
