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

export interface IEditFieldAction<T = any, E = string> extends IAction {
  payload: IReduxField<T, E>;
}

export type ReducersMap<T> = {
  [key in keyof T]: Reducer<T[key]>;
};

export type FieldValidator<S> = (nextState: S, prevState: S) => string;
