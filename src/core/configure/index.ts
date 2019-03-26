import { makeDeps, modules, reduxEntries } from 'config';
import { ReducersMap } from 'shared/types/redux';

import { IAppData, IModule, RootSaga, IAppReduxState, IReduxEntry, IDependencies } from '../types';
import { TYPES, container } from './ioc';
import configureStore, { createReducer } from './store';
import { configureJss } from './jss';

function configureApp(data?: IAppData): IAppData {
  if (data) {
    return data;
  }

  const connectedSagas: RootSaga[] = [];
  const connectedReducers: ReducersMap<Partial<IAppReduxState>> = {};

  const { runSaga, store } = configureStore();

  const baseDeps = { runSaga, store };
  const dependencies: IDependencies = {
    ...baseDeps,
    ...makeDeps(baseDeps),
  };
  const jssDeps = configureJss();

  try {
    container.getAll(TYPES.Deps);
    container.rebind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.rebind(TYPES.Deps).toConstantValue(dependencies);
  } catch {
    container.bind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.bind(TYPES.Deps).toConstantValue(dependencies);
  }

  reduxEntries.forEach(connectEntryToStore);
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
      const keys = Object.keys(reducers) as Array<keyof typeof reducers>;
      const isNeedReplace: boolean = keys.reduce<boolean>((acc, key: keyof typeof reducers) => {
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

  return { deps: dependencies, jssDeps };
}

export default configureApp;
