import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Store, Reducer, ActionCreator, Action } from 'redux';
import { SagaIterator } from 'redux-saga';

import * as features from 'features';
import { Api } from 'services/api/Api';
import * as ThemeProviderNS from 'services/theme/namespace'; // TODO: УДОЛИ
import { namespace as NotificationNamespace } from 'services/notification';

export abstract class IModule {
  public getRoutes?(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;

  public getReduxEntry?(): IReduxEntry;
}

export interface IAppData {
  modules: IModule[];
  store: Store<IAppReduxState>;
}

export interface IDependencies {
  api: Api;
}

export interface IReduxEntry {
  reducers?: { [key in keyof IAppReduxState]?: Reducer<IAppReduxState[key]> };
  sagas?: Array<(deps: IDependencies) => () => SagaIterator>;
}

export interface IWithContainers<T> {
  containers: T;
}

export interface IFeatureEntry extends Partial<IWithContainers<Record<string, React.ComponentType<any>>>> {
  actionCreators?: Record<string, ActionCreator<Action>>;
  selectors?: Record<string, (state: any, ...args: any[]) => any>;
  reduxEntry?: IReduxEntry;
}

export interface IAppReduxState {
  // services
  theme: ThemeProviderNS.IReduxState;
  notification: NotificationNamespace.IReduxState;
  // features
  usersSearch: features.usersSearch.namespace.IReduxState;
  repositoriesSearch: features.repositoriesSearch.namespace.IReduxState;
  profile: features.profile.namespace.IReduxState;
}

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type Lang = 'en-US' | 'ru-RU';

export type Uid = number;

export interface IAssets {
  javascript: string[];
  styles: string[];
  favicons: CheerioElement[];
}
