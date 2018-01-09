import { IGeosuggestOption } from 'shared/view/components/GenericLocationInput/GenericLocationInput';

export interface IFields {
  schema?: ISchema;
  id?: number;
  uid?: number;
  alert?: boolean;
  name?: string;
}

export interface ISchema {
  properties: {[key: string]: IField};
  required: string[];
  type: 'string' | 'object';
  title: string;
}

export interface IField {
  type: 'string' | 'integer' | 'number';
  component: 'text' | 'integer' | 'number' | 'radio' | 'dropdown' | 'location' | 'date' | 'time';
  order: number;
  label: string;
  placeholder: string;
  display: number;
  pattern?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
}

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
