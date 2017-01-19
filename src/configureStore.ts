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
import { reducer as categorySelectReducer } from './features/categorySelect';
import { reducer as locationSelectReducer, actions } from './features/locationSelect';
import { reducer as dynamicFieldsReducer } from './features/dynamicFields';
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
    categorySelect: categorySelectReducer,
    locationSelect: locationSelectReducer,
    dynamicFields: dynamicFieldsReducer,
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

  sagaMiddleware.run(actions.saga(extraArguments));

  return store;
}

export default configureStore;
