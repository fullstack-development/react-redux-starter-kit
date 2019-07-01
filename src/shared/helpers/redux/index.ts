
import { Reducer } from 'redux';

export { default as composeReducers } from './composeReducers';
export { default as makeIdentityReducer } from './makeIdentityReducer';
export { default as makeResetStateReducer } from './makeResetStateReducer';
export { default as isSuccessedByState } from './isSuccessedByState';

export interface ICommunicationState<T = string> {
  isRequesting: boolean;
  error: T;
}

export type ReducersMap<T> = { [key in keyof T]: Reducer<T[key]> };
