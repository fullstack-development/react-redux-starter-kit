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
import { IModule, IReduxState, IDependencies, IReducerData } from './shared/types/app';
import Api from './shared/api/Api';
import { Saga } from 'redux-saga';

interface IStoreData {
  store: Store<IReduxState>;
  runSaga: (saga: Saga, ...args: any[]) => void;
}

function configureStore(modules: Array<IModule<any>>, api: Api): IStoreData {
  const sagaMiddleware = createSagaMiddleware();
  const extraArguments: IDependencies = { api };

  const middlewares: Middleware[] = [
    sagaMiddleware,
    thunk.withExtraArgument(extraArguments),
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

  sagaMiddleware.run(locationSelectFeature.actions.saga(extraArguments));
  sagaMiddleware.run(dynamicFieldsFeature.actions.saga(extraArguments));

  return {
    store,
    runSaga: sagaMiddleware.run,
  };
}

function createReducer(modules: Array<IModule<any>>, extraReducers?: Array<IReducerData<any>>): Reducer<IReduxState> {
  const reducersData = modules
    .filter((module: IModule<any>) => module.getReducer)
    .map((module: IModule<any>) => module.getReducer ? module.getReducer() : null)
    .concat(extraReducers || []);

  const modulesReducers: ReducersMapObject = reducersData.reduce(
    (reducers: ReducersMapObject, reducerData: IReducerData<any>) => {
      return { ...reducers, [reducerData.name]: reducerData.reducer };
    }, {} as ReducersMapObject,
  );

  return combineReducers<IReduxState>({
    locationSelect: locationSelectFeature.reducer,
    dynamicFields: dynamicFieldsFeature.reducer,
    ...modulesReducers,
  });
}

export { createReducer, IStoreData };
export default configureStore;
