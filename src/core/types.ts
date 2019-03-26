import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Store, Reducer, ActionCreator, Action } from 'redux';
import { SagaIterator, SagaMiddleware } from 'redux-saga';
import { GenerateClassName } from 'jss';

import { JSS } from 'shared/styles';
import { ExtraDeps, IAppReduxState } from 'config';

export { IAppReduxState };

export interface IBaseDeps {
  store: Store<IAppReduxState>;
  runSaga: SagaMiddleware<any>['run'];
}

export type IDependencies = ExtraDeps & IBaseDeps;

export abstract class IModule {
  public getRoutes?(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
  public getReduxEntry?(): IReduxEntry;
}

export interface IAppData {
  deps: IDependencies;
  jssDeps: IJssDependencies;
}

export interface IJssDependencies {
  jss: JSS;
  generateClassName: GenerateClassName<any>;
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

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type Lang = 'en' | 'he';

export type Uid = number;

export interface IAssets {
  javascript: string[];
  styles: string[];
  favicons: CheerioElement[];
}
