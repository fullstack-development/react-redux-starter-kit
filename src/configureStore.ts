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
import { reducer as categorySelectReducer } from './features/categorySelect';
import { reducer as locationSelectReducer } from './features/locationSelect';
import { reducer as dynamicFieldsReducer } from './features/dynamicFields';
import AppNamespace from './shared/types/app';
import Api from './shared/api/Api';

import Module = AppNamespace.Module;
import ExtraArguments = AppNamespace.ExtraArguments;
import ReduxState = AppNamespace.ReduxState;

function configureStore(modules: Module<any>[], api: Api): Store<Object> {
  const extraArguments: ExtraArguments = {
    api
  };
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

  const reducer: Reducer<ReduxState> = combineReducers<ReduxState>({
    categorySelect: categorySelectReducer,
    locationSelect: locationSelectReducer,
    dynamicFields: dynamicFieldsReducer,
    ...modulesReducers,
  });

  return createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      ('development' === process.env.NODE_ENV && window.devToolsExtension) ? window.devToolsExtension() : ((arg: any) => arg)
    )
  );
}

export default configureStore;