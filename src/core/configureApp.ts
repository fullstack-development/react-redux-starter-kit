import configureDeps from './configureDeps';
import { Reducer } from 'redux';
import { TYPES, container } from './configureIoc';
import configureStore, { createReducer } from './configureStore';

import { HomeModule, OrderFormModule } from 'modules';

import { ReducersMap } from 'shared/helpers/redux';
import { IAppData, Module, RootSaga, IAppReduxState, IReduxEntry } from 'shared/types/app';
import { IReduxState } from 'features/categorySelect/namespace';

function configureApp(): IAppData {
  /* Prepare main app elements */
  const modules: Module[] = [new HomeModule(), new OrderFormModule()];
  const sharedReduxEntries: IReduxEntry[] = [];

  const connectedSagas: RootSaga[] = [];
  const connectedReducers: ReducersMap<Partial<IAppReduxState>> = {};

  const { runSaga, store } = configureStore();
  container.bind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);

  const dependencies = configureDeps(store);

  sharedReduxEntries.forEach(connectEntryToStore);
  modules.forEach((module: Module) => {
    module.dependencies = dependencies;
    module.store = store;
    if (module.getReduxEntry) {
      connectEntryToStore(module.getReduxEntry());
    }
  });

  function connectEntryToStore({ reducers, sagas }: IReduxEntry) {
    if (!store) {
      throw new Error('Cannot find store, while connecting module.');
    }

    if (reducers) {
      const keys = Object.keys(reducers) as Array<keyof typeof reducers>;
      const isNeedReplace: boolean = keys.reduce<boolean>((acc, key: keyof typeof reducers) => {
        const featureReducer = reducers[key];
        if (!connectedReducers[key] && featureReducer) {
          connectedReducers[key] = featureReducer as Reducer<IReduxState | undefined>;
          return true;
        }
        return acc || false;
      }, false);

      if (isNeedReplace) {
        store.replaceReducer(createReducer(connectedReducers as ReducersMap<IAppReduxState>));
      }
    }

    if (sagas) {
      sagas.forEach((saga: RootSaga) => {
        if (!connectedSagas.includes(saga) && runSaga) {
          runSaga(saga(dependencies));
          connectedSagas.push(saga);
        }
      });
    }
  }

  return { modules, store };
}

export default configureApp;
