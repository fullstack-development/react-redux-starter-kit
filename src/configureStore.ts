import {
  compose,
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Middleware,
  Store,
  ReducersMapObject,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as locationSelectFeature from './features/locationSelect';
import * as dynamicFieldsFeature from './features/dynamicFields';
import { Module, IReduxState, IDependencies, IReducerData } from './shared/types/app';
import Api from './shared/api/Api';
import { SagaMiddleware } from 'redux-saga';

interface IStoreData {
  store: Store<IReduxState>;
  runSaga: SagaMiddleware['run'];
}

function configureStore(modules: Array<Module<any, any>>, deps: IDependencies): IStoreData {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [
    sagaMiddleware,
    thunk.withExtraArgument(deps),
  ];

  const reducer: Reducer<IReduxState> = createReducer(modules);
  const store: Store<IReduxState> = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      ('development' === process.env.NODE_ENV && window.devToolsExtension)
        ? window.devToolsExtension() : ((arg: any) => arg),
    ),
  ) as Store<IReduxState>;

  modules.forEach((module: Module<any, any>) => {
    if (module.getSaga) {
      sagaMiddleware.run(module.getSaga(deps));
    }
  });

  sagaMiddleware.run(locationSelectFeature.actions.saga(deps));
  sagaMiddleware.run(dynamicFieldsFeature.actions.saga(deps));

  return {
    store,
    runSaga: sagaMiddleware.run,
  };
}

function createReducer(
  modules: Array<Module<any, any>>, extraReducers?: Array<IReducerData<any>>,
): Reducer<IReduxState> {
  const reducersData = modules
    .filter((module: Module<any, any>) => module.getReducer)
    .map((module: Module<any, any>) => module.getReducer ? module.getReducer() : null)
    .concat(extraReducers || []);

  const modulesReducers: ReducersMapObject = reducersData.reduce(
    (reducers: ReducersMapObject, reducerData: IReducerData<any>) => {
      return { ...reducers, [reducerData.name]: reducerData.reducer };
    }, {} as ReducersMapObject,
  );

  return combineReducers<IReduxState>({
    ...modulesReducers,
  });
}

export { createReducer, IStoreData };
export default configureStore;
