import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Store, Reducer, ActionCreator, Action } from 'redux';
import { SagaIterator } from 'redux-saga';
import { GenerateClassName } from 'jss';
import { JSS, Theme } from 'react-jss';

import Api from 'services/api/Api';

import * as i18nNS from 'services/i18n/namespace';

export abstract class Module<C = any> {
  public getRoutes?(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
  public getReduxEntry?(): IReduxEntry;
}

export interface IAppData {
  modules: Module[];
  store: Store<IAppReduxState>;
  jssDeps: IJssDependencies;
}

export interface IJssDependencies {
  jss: JSS;
  generateClassName: GenerateClassName<any>;
  theme: Theme;
}

export interface IDependencies {
  api: Api;
}

export type IDictionary<T, S extends keyof any = string> = {
  [key in S]: T;
};

export interface IReduxEntry {
  reducers?: { [key in keyof IAppReduxState]?: Reducer<IAppReduxState[key]> };
  sagas?: Array<(deps: IDependencies) => () => SagaIterator>;
}

export interface IFeatureEntry<
  C extends IDictionary<React.ReactType<any>, keyof C> | void,
  A extends IDictionary<ActionCreator<Action>, keyof A> | void,
  S extends IDictionary<(state: any, ...args: any[]) => any, keyof S> | void,
  > extends IReduxEntry {
  actions?: A;
  selectors?: S;
  containers?: C;
}

export interface IAppReduxState {
  // services
  i18n: i18nNS.IReduxState;
}

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type Lang = 'en' | 'he';

export type Uid = number;

export interface IAssets {
  javascript: string[];
  styles: string[];
  favicons: CheerioElement[];
}
