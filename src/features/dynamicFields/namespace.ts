import { IAction } from 'shared/types/app';
import { IFields, IFormProperties } from 'shared/types/models';
import { ICommunicationState } from 'shared/helpers/redux';
import { IGeosuggestOption } from 'shared/view/components/GenericLocationInput/GenericLocationInput';
import { FieldValue } from 'shared/view/components/GenericInput/GenericInput';

export interface IFormProperties {
  [key: string]: string | number | IGeosuggestOption;
}

export interface IFlatFormProperties {
  [key: string]: string | number;
}

export interface IGeoPoint {
  lat: number;
  lng: number;
}

export interface ILocationProperties {
  [key: string]: IGeoPoint;
  from: IGeoPoint;
  to: IGeoPoint;
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

export interface IReduxState {
  communications: {
    fetching: ICommunicationState;
  };
  data: {
    fields: IFields;
    values: IFormProperties;
  };
}

export type ILoadFieldsAction = IAction<'DYNAMIC_FIELDS:LOAD_FIELDS', number>;
export type ILoadFieldsCompletedAction = IAction<'DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED', IFields>;
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
