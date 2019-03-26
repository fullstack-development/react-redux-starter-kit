import Api from 'services/api/Api';
import * as themeService from 'services/theme';
import { I18nProvider } from 'services/i18n';
import * as notsService from 'services/notification';

import * as features from 'features';

import * as allModules from 'modules';
import { App } from 'modules/App';
import { default as routes } from 'modules/routes';

import { IBaseDeps, IModule, IReduxEntry } from 'core/types';

export const default404RedirectPath: string | null = routes.search.users.getRedirectPath();

export function makeDeps(_baseDeps: IBaseDeps) {
  return {
    api: new Api(),
  };
}

export const modules: IModule[] = Object.values(allModules);

export const reduxEntries: IReduxEntry[] = [
  themeService.reduxEntry,
  notsService.reduxEntry,
];

export const RootComponent: React.ComponentType = App;

export const reactAppWrappers: React.ComponentType[] = [
  I18nProvider,
];

export type ExtraDeps = ReturnType<typeof makeDeps>;

export interface IAppReduxState {
  // services
  theme: themeService.namespace.IReduxState;
  notification: notsService.namespace.IReduxState;
  // features
  usersSearch: features.usersSearch.namespace.IReduxState;
  repositoriesSearch: features.repositoriesSearch.namespace.IReduxState;
  profile: features.profile.namespace.IReduxState;
}
