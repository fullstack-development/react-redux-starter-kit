import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { compose, applyMiddleware, combineReducers, createStore, Reducer, Middleware, Store } from 'redux';

import { composeReducers } from 'shared/helpers/redux';
import { IAppReduxState } from 'shared/types/app';
import { ReducersMap } from 'shared/types/redux';

interface IStoreData {
  store: Store<IAppReduxState>;
  runSaga: SagaMiddleware<any>['run'];
}

function configureStore(): IStoreData {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware];

  const isBrowser = typeof window !== 'undefined';
  const composeEnhancers = isBrowser && process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : compose;

  const initialAppState: IAppReduxState | undefined = isBrowser ? window.__data : undefined;

  const store: Store<IAppReduxState> = initialAppState
    ? (
      createStore(
        (state: IAppReduxState) => state,
        initialAppState,
        composeEnhancers(applyMiddleware(...middlewares)),
      )
    ) : (
      createStore(
        (state: IAppReduxState) => state,
        composeEnhancers(applyMiddleware(...middlewares)),
      )
    );

  return {
    store,
    runSaga: sagaMiddleware.run,
  };
}

function createReducer(reducers: ReducersMap<IAppReduxState>): Reducer<IAppReduxState> {
  return composeReducers<IAppReduxState>([
    combineReducers<IAppReduxState>(reducers),
  ]);
}

export { createReducer, IStoreData };
export default configureStore;
