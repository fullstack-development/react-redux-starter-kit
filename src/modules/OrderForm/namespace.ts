import { IFormProperties } from '../../features/dynamicFields/namespace';
import { IPlainAction, IAction } from 'shared/types/app';

export interface IOrderFormRequest {
  attributes: IFormProperties;
  notify: boolean;
  description: string;
  location: number;  // area id only - don't need a city id
  category: number;
  coord_from_lng: number;
  coord_from_lat: number;
  coord_to_lng: number;
  coord_to_lat: number;
}

export interface IOrderFormResponse {
  message: string;
}

export interface ICommunication {
  isRequesting: boolean;
  error: string;
}

export interface IReduxState {
  communications: {
    saving: ICommunication;
  };
  data: { message: string; } | null;
}

export type ISaveFieldsAction = IPlainAction<'ORDER_FORM_MODULE:SAVE_FIELDS'>;
export type ISaveFieldsCompletedAction = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS_COMPLETED', IOrderFormResponse>;
export type ISaveFieldsFailedAction = IAction<'ORDER_FORM_MODULE:SAVE_FIELDS_FAILED', string>;

export type OrderFormAction =
  | ISaveFieldsAction
  | ISaveFieldsCompletedAction
  | ISaveFieldsFailedAction;
