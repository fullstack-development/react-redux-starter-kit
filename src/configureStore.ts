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
import { IModule, IReduxState, IExtraArguments, IReducerData } from './shared/types/app';
import Api from './shared/api/Api';

function configureStore(modules: Array<IModule<any>>, api: Api): Store<Object> {
  const sagaMiddleware = createSagaMiddleware();
  const extraArguments: IExtraArguments = { api };

  const middlewares: Middleware[] = [
    sagaMiddleware,
    thunk.withExtraArgument(extraArguments),
  ];

  const reducer: Reducer<IReduxState> = createReducer(modules);

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      ('development' === process.env.NODE_ENV && window.devToolsExtension)
        ? window.devToolsExtension() : ((arg: any) => arg),
    ),
  );

  sagaMiddleware.run(locationSelectFeature.actions.saga(extraArguments));
  sagaMiddleware.run(dynamicFieldsFeature.actions.saga(extraArguments));

  return store;
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

export { createReducer };
export default configureStore;
