import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Store, Reducer, ActionCreator, Action } from 'redux';

import { SagaIterator } from 'redux-saga';

import { namespace as CategorySelectNamespace } from 'features/categorySelect';
import { namespace as LocationSelectNamespace } from 'features/locationSelect';
import { namespace as SearchRepositoriesNamespace } from 'features/searchRepositories';
import { namespace as DynamicFieldsNamespace } from 'features/dynamicFields';
import { Namespace as HomeModuleNamespace } from '../../modules/OrderForm/OrderForm';

import Api from 'services/api/Api';

export abstract class Module<C = any> {
  public components?: C; // available componens to pass in other modules

  protected _store: Store<IAppReduxState> | null = null;
  protected _deps: IDependencies | null = null;

  protected extraComponents?: { [key: string]: React.ReactElement<any> | React.ComponentClass<any> | null; };

  public set store(store: Store<IAppReduxState>) {
    this._store = store;
  }

  public set dependencies(value: IDependencies) {
    this._deps = value;
  }

  protected get deps(): IDependencies | null {
    return this._deps || null;
  }

  public getRoutes?(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
  public getReduxEntry?(): IReduxEntry;

  public setExtraComponent(key: keyof C, component: React.ReactElement<any>): void {
    if (this.extraComponents) {
      this.extraComponents[key] = component;
    } else {
      throw new Error('Cannot set module extra component: no requirements found for extra component');
    }
  }
}

export interface IAppData {
  modules: Module[];
  store: Store<IAppReduxState>;
}

export interface IDependencies {
  api: Api;
}

export type IDictionary<T, S extends string = string> = {
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
  categorySelect: CategorySelectNamespace.IReduxState;
  locationSelect: LocationSelectNamespace.IReduxState;
  dynamicFields: DynamicFieldsNamespace.IReduxState;
  orderForm: HomeModuleNamespace.IReduxState;
  searchRepositories: SearchRepositoriesNamespace.IReduxState;
}

export type Diff<T extends string, U extends string> =
  ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type Lang = 'en' | 'he';

export type Uid = number;

export interface IAssets {
  javascript: string[];
  styles: string[];
}

export * from '../helpers/redux/namespace';
