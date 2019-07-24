import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { compose, applyMiddleware, combineReducers, createStore, Reducer, Middleware, Store } from 'redux';

import { composeReducers } from 'shared/helpers/redux';
import { IAppReduxState } from 'shared/types/app';
import { ReducersMap, IAction } from 'shared/types/redux';

interface IStoreData {
  store: Store<IAppReduxState>;
  runSaga: SagaMiddleware<any>['run'];
}

function configureStore(): IStoreData {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware];

  const isBrowser = typeof window !== 'undefined';
  const composeEnhancers = isBrowser && process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : compose;

  const store: Store<IAppReduxState> = createStore(
    (state: IAppReduxState) => state,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return {
    store,
    runSaga: sagaMiddleware.run,
  };
}

function createReducer(reducers: ReducersMap<IAppReduxState>): Reducer<IAppReduxState> {
  const composed = composeReducers<IAppReduxState>([
    combineReducers<IAppReduxState>(reducers),
  ]);

  return (state: IAppReduxState, action: IAction<any, any>) => {
    if (action.type === 'RESET_STATE' && action.payload) {
      return action.payload;
    }

    return composed(state, action);
  };
}

export { createReducer, IStoreData };
export default configureStore;
