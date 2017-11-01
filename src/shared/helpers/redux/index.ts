import { Reducer, Action } from 'redux';

export type ReducersMap<T> = {
  [key in keyof T]: Reducer<T[key]>;
};

export function composeReducers<S>(reducers: Array<Reducer<S>>) {
  return <A extends Action>(state: S, action: A) =>
    reducers
      .reverse()
      .reduce((_state: S, reducer: Reducer<S>) => reducer(_state, action), state);
}
