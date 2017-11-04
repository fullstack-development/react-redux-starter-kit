import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
  Reducer,
  ReducersMapObject,
  Store,
  StoreEnhancerStoreCreator,
} from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import * as dynamicFieldsFeature from './features/dynamicFields';
import * as locationSelectFeature from './features/locationSelect';
import { IAppReduxState, IDependencies, IReducerData, Module } from './shared/types/app';

interface IStoreData {
  store: Store<IAppReduxState>;
  reducer: Reducer<IAppReduxState>;
  runSaga: SagaMiddleware['run'];
}

function configureStore(modules: Array<Module<any, any>>, deps: IDependencies): IStoreData {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [ sagaMiddleware ];

  const reducer: Reducer<IAppReduxState> = createReducer(modules);
  const store: Store<IAppReduxState> = createStore(
    reducer,
    compose<StoreEnhancerStoreCreator<IAppReduxState>, StoreEnhancerStoreCreator<IAppReduxState>>(
      applyMiddleware(...middlewares),
      ('development' === process.env.NODE_ENV && window.devToolsExtension)
      ? window.devToolsExtension() : () => void 0,
    ),
  );

  modules.forEach((module: Module<any, any>) => {
    if (module.getSaga) {
      sagaMiddleware.run(module.getSaga(), deps);
    }
  });

  sagaMiddleware.run(locationSelectFeature.actions.saga(deps));
  sagaMiddleware.run(dynamicFieldsFeature.actions.saga(deps));

  return {
    store,
    reducer,
    runSaga: sagaMiddleware.run,
  };
}

function createReducer(
  modules: Array<Module<any, any>>, extraReducers?: Array<IReducerData<any>>,
): Reducer<IAppReduxState> {
  const reducersData = modules
    .filter((module: Module<any, any>) => module.getReducer)
    .map((module: Module<any, any>) => module.getReducer!())
    .concat(extraReducers || []);

  const modulesReducers: ReducersMapObject = reducersData.reduce(
    (reducers: ReducersMapObject, reducerData: IReducerData<any>) => {
      return { ...reducers, [reducerData.name]: reducerData.reducer };
    }, {},
  );

  return combineReducers<IAppReduxState>({
    ...modulesReducers,
  });
}

export { createReducer, IStoreData };
export default configureStore;
