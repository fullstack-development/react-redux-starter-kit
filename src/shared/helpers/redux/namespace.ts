import { Reducer } from 'redux';

export interface IAction<T = string> {
  type: T;
}

export interface IActionWithPayload<A = string, P = any> extends IAction<A> {
  payload: P;
}

export interface IFailAction<T = any> extends IAction {
  error: T;
}

export interface IFailActionWithPayload<T = any, E = any> extends IFailAction<E> {
  payload: T;
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

export interface IEditFieldAction<T = any, E = string> extends IAction {
  payload: IReduxField<T, E>;
}

export type ReducersMap<T> = {
  [key in keyof T]: Reducer<T[key]>;
};
