import { Reducer, Action } from 'redux';

function composeReducers<S>(reducers: Array<Reducer<S>>) {
  return <A extends Action>(state: S, action: A) =>
    reducers.reduceRight((_state: S, reducer: Reducer<S>) =>
      reducer(_state, action), state);
}

export { composeReducers };
