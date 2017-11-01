import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import {
  compose, applyMiddleware, combineReducers, createStore,
  Reducer, Middleware, Store, ReducersMapObject,
} from 'redux';

import { IAppReduxState } from 'shared/types/app';
import { composeReducers, ReducersMap } from 'shared/helpers/redux';
import { reducer as multiConnectReducer } from 'shared/helpers/redux/multiConnect';

interface IStoreData {
  store: Store<IAppReduxState>;
  runSaga: SagaMiddleware['run'];
}

function configureStore(): IStoreData {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware];
  const store: Store<IAppReduxState> = createStore(
    state => state,
    compose(
      applyMiddleware(...middlewares),
      ('development' === process.env.NODE_ENV && window.devToolsExtension)
        ? window.devToolsExtension() : ((arg: any) => arg),
    ),
  ) as Store<IAppReduxState>;

  return {
    store,
    runSaga: sagaMiddleware.run,
  };
}

function createReducer(reducers: ReducersMap<IAppReduxState>): Reducer<IAppReduxState> {
  return composeReducers<IAppReduxState>([
    multiConnectReducer as Reducer<IAppReduxState>,
    combineReducers<IAppReduxState>(reducers as ReducersMapObject),
  ]);
}

export { createReducer, IStoreData };
export default configureStore;
