import {
  compose,
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Middleware,
  Store,
  ReducersMapObject
} from 'redux';
import thunk from 'redux-thunk';
import AppNamespace from './shared/types/app';

import Module = AppNamespace.Module;
import ExtraArguments = AppNamespace.ExtraArguments;
import ReduxState = AppNamespace.ReduxState;

function configureStore(modules: Module<any>[]): Store<Object> {
  const extraArguments: ExtraArguments = {};
  const middlewares: Middleware[] = [
    thunk.withExtraArgument(extraArguments)
  ];

  const modulesReducers: ReducersMapObject = modules.reduce((reducers, module) => {
    if (module.getReducer) {
      const reducerData = module.getReducer();
      reducers[reducerData.name] = reducerData.reducer;
    }

    return reducers;
  }, {} as ReducersMapObject);

  const reducer: Reducer<ReduxState> = combineReducers<ReduxState>(modulesReducers);

  return createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      ('development' === process.env.NODE_ENV && window.devToolsExtension) ? window.devToolsExtension() : ((arg: any) => arg)
    )
  );
}

export default configureStore;