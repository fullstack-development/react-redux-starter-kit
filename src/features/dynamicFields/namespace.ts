import { IGeosuggestOption } from 'shared/view/components/GenericLocationInput/GenericLocationInput';
import { FieldValue } from 'shared/view/components/GenericInput/GenericInput';
import { IAction } from 'shared/types/app';
import { IFieldsResponse } from 'shared/api/Api';

export interface IFormProperties {
  [key: string]: string | number | IGeosuggestOption;
}

export interface IFlatFormProperties {
  [key: string]: string | number;
}

export interface ILocationProperties {
  [key: string]: { lat: number; lng: number; };
  from: { lat: number; lng: number; };
  to: { lat: number; lng: number; };
}

export interface IField {
  type: 'string' | 'integer';
  component: 'text' | 'integer' | 'radio' | 'dropdown' | 'location' | 'date' | 'time';
  order: number;
  label: string;
  pattern: string;
  placeholder: string;
  display: number;
  'enum': string[];
  minimum: number;
  maximum: number;
  minLength: number;
  maxLength: number;
}

export interface ISchema {
  properties: { [key: string]: IField };
  required: string[];
  type: 'string';
  title: string;
}

export interface IFields {
  schema?: ISchema;
  id?: number;
  uid?: number;
  alert?: boolean;
  name?: number;
}

export interface ICommunication {
  isRequesting: boolean;
  error: string;
}

export interface IReduxState {
  communications: {
    fetching: ICommunication;
  };
  data: {
    fields: IFields;
    values: IFormProperties;
  };
}

export type ILoadFieldsAction = IAction<'DYNAMIC_FIELDS:LOAD_FIELDS', number>;
export type ILoadFieldsCompletedAction = IAction<'DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED', IFieldsResponse>;
export type ILoadFieldsFailedAction = IAction<'DYNAMIC_FIELDS:LOAD_FIELDS_FAILED', string>;

export type IChangeFieldValueAction = IAction<'DYNAMIC_FIELDS:CHANGE_FIELD_VALUE', IChangeFieldValueActionPayload>;
export interface IChangeFieldValueActionPayload {
  name: string;
  value: FieldValue;
}

export type DynamicFieldsAction =
  | ILoadFieldsAction
  | ILoadFieldsCompletedAction
  | ILoadFieldsFailedAction
  | IChangeFieldValueAction;
