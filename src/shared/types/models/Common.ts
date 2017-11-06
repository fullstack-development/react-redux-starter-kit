export interface IFields {
  schema?: ISchema;
  id?: number;
  uid?: number;
  alert?: boolean;
  name?: number;
}

export interface ISchema {
  properties: {[key: string]: IField};
  required: string[];
  type: 'string';
  title: string;
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
