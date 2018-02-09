import { IMultiInstanceState } from './namespace';
import { IMultiAction } from 'shared/types/redux';

type Reducer<TReduxState> = (instanceState: TReduxState, action: IMultiAction<string>) => TReduxState;

export function multiReducer<IReduxState>(reducer: Reducer<IReduxState>): Reducer<IMultiInstanceState<IReduxState>> {
  return (state = {}, action) => {
    const { _instanceKey } = action;
    if (!_instanceKey || !state[_instanceKey]) { return state; }
    const nextInstanceState = reducer(state[_instanceKey], action);
    return { ...state, [_instanceKey]: nextInstanceState };
  };
}
