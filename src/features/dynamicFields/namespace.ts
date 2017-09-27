import { IGeosuggestOption } from 'shared/view/components/GenericLocationInput/GenericLocationInput';

interface IFormProperties {
  [key: string]: string | number | IGeosuggestOption;
}

interface IFlatFormProperties {
  [key: string]: string | number;
}

interface ILocationProperties {
  [key: string]: { lat: number; lng: number; };
  from: { lat: number; lng: number; };
  to: { lat: number; lng: number; };
}

interface IField {
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

interface ISchema {
  properties: {[key: string]: IField};
  required: string[];
  type: 'string';
  title: string;
}

interface IFields {
  schema?: ISchema;
  id?: number;
  uid?: number;
  alert?: boolean;
  name?: number;
}

interface ICommunication {
  isRequesting: boolean;
  error: string;
}

interface IReduxState {
  communications: {
    fetching: ICommunication;
  };
  data: {
    fields: IFields;
    values: IFormProperties;
  };
}

export {
  IFormProperties,
  IFlatFormProperties,
  ILocationProperties,
  ISchema,
  IFields,
  IField,
  ICommunication,
  IReduxState,
};
