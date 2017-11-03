import { Reducer, Action } from 'redux';

export default function composeReducers<S>(reducers: Array<Reducer<S>>) {
  return <A extends Action>(state: S, action: A) =>
    reducers
      .reverse()
      .reduce((_state: S, reducer: Reducer<S>) => reducer(_state, action), state);
}
