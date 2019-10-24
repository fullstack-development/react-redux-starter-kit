
import * as allModules from 'modules';
import { ReducersMap } from 'shared/types/redux';
import { reduxEntry as themeProviderRE } from 'services/theme';
import { reduxEntry as notificationReduxEntry } from 'services/notification';
import { IAppData, IModule, RootSaga, IAppReduxState, IReduxEntry } from 'shared/types/app';
import { initializeI18n } from 'services/i18n/i18nContainer';

import { configureStore, createReducer } from './configureStore';
import { TYPES, container } from './configureIoc';
import { configureDeps } from './configureDeps';

type ReducerName = keyof IAppReduxState;

function configureApp(data?: IAppData): IAppData {
  /* Prepare main app elements */
  const modules: IModule[] = Object.values(allModules);

  if (data) {
    return { ...data, modules };
  }

  const sharedReduxEntries: IReduxEntry[] = [
    themeProviderRE,
    notificationReduxEntry,
  ];

  const connectedSagas: RootSaga[] = [];
  const connectedReducers: Partial<ReducersMap<IAppReduxState>> = {};

  const { runSaga, store } = configureStore();
  try {
    container.getAll(TYPES.Store);
    container.rebind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.rebind(TYPES.Store).toConstantValue(store);
  } catch {
    container.bind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.bind(TYPES.Store).toConstantValue(store);
  }

  const dependencies = configureDeps();
  initializeI18n();

  sharedReduxEntries.forEach(connectEntryToStore);
  modules.forEach((module: IModule) => {
    if (module.getReduxEntry) {
      connectEntryToStore(module.getReduxEntry());
    }
  });

  function connectEntryToStore({ reducers, sagas }: IReduxEntry) {
    if (!store) {
      throw new Error('Cannot find store, while connecting module.');
    }

    if (reducers) {
      const keys = Object.keys(reducers) as ReducerName[];
      const isNeedReplace = keys.reduce(<K extends ReducerName>(acc: boolean, key: K) => {
        const featureReducer = reducers[key];
        if (!connectedReducers[key] && featureReducer) {
          connectedReducers[key] = featureReducer;
          return true;
        }
        return acc || false;
      }, false);

      if (isNeedReplace) {
        store.replaceReducer(createReducer(connectedReducers as ReducersMap<IAppReduxState>));
      }
    }

    if (sagas && __CLIENT__) {
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

export { configureApp };
