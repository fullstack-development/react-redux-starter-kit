import { SagaMiddleware } from 'redux-saga';
import { Store, Reducer } from 'redux';
import { HomeModule, OrderFormModule } from './modules';
import configureStore, { createReducer } from './configureStore';
import { Module, IReducerData, IDependencies, RootSaga, IAppReduxState } from './shared/types/app';
import Api from './shared/api/Api';

interface IAppData {
  modules: Array<Module<any, any>>;
  store: Store<IAppReduxState>;
  reducer: Reducer<IAppReduxState>;
  reducers: Array<IReducerData<any>>;
  runSaga: SagaMiddleware['run'];
  sagas: RootSaga[];
}

function configureApp(appData?: IAppData): IAppData {
  /* Prepare main app elements */
  const modules = {
    home: new HomeModule(),
    tenders: new OrderFormModule(),
    toArray(): Array<Module<any, any>> {
      return Object.keys(this).filter(key => key !== 'toArray').map(key => this[key]);
    },
  };

  const modulesArray = modules.toArray();
  const connectedSagas: RootSaga[] = [];
  const connectedReducers: Array<IReducerData<any>> = [];
  const dependencies: IDependencies = { api: new Api('/api') };

  let store: Store<IAppReduxState> | null = null;
  let runSaga: SagaMiddleware['run'] | null = null;
  let reducer: Reducer<IAppReduxState> | null = null;

  if (!appData) {
    const storeData = configureStore(modulesArray, dependencies);
    store = storeData.store;
    runSaga = storeData.runSaga;
    reducer = storeData.reducer;
  } else {
    reducer = createReducer(modules.toArray(), appData.reducers);
    runSaga = appData.runSaga;
    store = appData.store;
    connectedReducers.push(...appData.reducers);
    connectedSagas.push(...appData.sagas);
    store.replaceReducer(reducer);
  }

  modulesArray.forEach((module: Module<any, any>) => module.onConnectRequest = onModuleConnectRequest);
  function onModuleConnectRequest(reducers: Array<IReducerData<any>>, sagas: RootSaga[]) {
    if (!store) {
      throw new Error('Cannot find store, while connecting module.');
    }

    reducers.forEach((_reducer: IReducerData<any>) => {
      if (!connectedReducers.find((r: IReducerData<any>) => r.name === _reducer.name)) {
        connectedReducers.push(_reducer);
      }
    });

    sagas.forEach((saga: RootSaga) => {
      if (!connectedSagas.includes(saga) && runSaga) {
        runSaga(saga(dependencies));
        connectedSagas.push(saga);
      }
    });

    store.replaceReducer(createReducer(modulesArray, connectedReducers));
  }

  return {
    modules: modulesArray,
    sagas: connectedSagas,
    reducers: connectedReducers,
    store,
    reducer,
    runSaga,
  };
}

export default configureApp;
