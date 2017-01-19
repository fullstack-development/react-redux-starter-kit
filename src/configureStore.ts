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
import * as categorySelectFeature from './features/categorySelect';
import * as locationSelectFeature from './features/locationSelect';
import * as dynamicFieldsFeature from './features/dynamicFields';
import { IModule, IReduxState, IExtraArguments } from './shared/types/app';
import Api from './shared/api/Api';

function configureStore(modules: Array<IModule<any>>, api: Api): Store<Object> {
  const sagaMiddleware = createSagaMiddleware();
  const extraArguments: IExtraArguments = { api };

  const middlewares: Middleware[] = [
    sagaMiddleware,
    thunk.withExtraArgument(extraArguments),
  ];

  const modulesReducers: ReducersMapObject = modules.reduce((reducers, module) => {
    if (module.getReducer) {
      const reducerData = module.getReducer();
      reducers[reducerData.name] = reducerData.reducer;
    }

    return reducers;
  }, {} as ReducersMapObject);

  const reducer: Reducer<IReduxState> = combineReducers<IReduxState>({
    categorySelect: categorySelectFeature.reducer,
    locationSelect: locationSelectFeature.reducer,
    dynamicFields: dynamicFieldsFeature.reducer,
    ...modulesReducers,
  });

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

export default configureStore;
