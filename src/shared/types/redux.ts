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

export interface IMultiAction<T = string> {
  _instanceKey?: string;
  type: T;
}

export interface ICommunication<E = string> {
  isRequesting: boolean;
  error: E;
}

// TODO: remove
export type ReducersMap<T> = {
  [key in keyof T]: Reducer<T[key]>;
};
