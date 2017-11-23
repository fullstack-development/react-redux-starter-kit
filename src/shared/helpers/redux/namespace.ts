import { Reducer } from 'redux';

export interface IPlainAction<T> {
  type: T;
}

export interface IAction<T, P> extends IPlainAction<T> {
  payload: P;
}

export interface IPlainFailAction<T, E = string> extends IPlainAction<T> {
  error: E;
}

export interface IFailAction<T, P, E = string> extends IPlainFailAction<T, E> {
  payload: P;
}

export interface IProtect {
  type: '';
  error: any;
}

export interface ICommunicationState<T = string> {
  isRequesting: boolean;
  error: T;
}

export interface IReduxField<T = any, E = string> {
  value: T;
  error: E;
}

export type FieldsState<F extends string> = {
  [P in F]: IReduxField<any>;
};

export type Validator<S> = (nextState: S, prevState: S) => string;

export interface IEditFieldAction<T = any, E = string> extends IPlainAction<string> {
  payload: IReduxField<T, E>;
}

export type ReducersMap<T> = {
  [key in keyof T]: Reducer<T[key]>;
};
