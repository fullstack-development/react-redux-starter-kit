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

export interface IReduxEntry {
  reducers?: { [key in keyof IAppReduxState]?: Reducer<IAppReduxState[key]> };
  sagas?: Array<(deps: IDependencies) => () => SagaIterator>;
}

export interface IFeatureEntry {
  containers?: Record<string, React.ComponentType<any>>;
  actions?: Record<string, ActionCreator<Action>>;
  selectors?: Record<string, (state: any, ...args: any[]) => any>;
  reduxEntry?: IReduxEntry;
}

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type Lang = 'en' | 'he';

export type Uid = number;

export interface IAssets {
  javascript: string[];
  styles: string[];
  favicons: CheerioElement[];
}
