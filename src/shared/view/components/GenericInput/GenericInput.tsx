import * as React from 'react';

declare namespace GenericField {
  type FieldValue = string | number | {[key: string]: any};
  interface Props {
    type: string;
    component: string;
    order: number;
    name: string;
    required: boolean;

    'enum': Array<string>;
    label: string;
    pattern: string;
    placeholder: string;

    errors?: Array<string>;

    onChange: (value: FieldValue, errors: string[]) => void;
  }

}


export default GenericField;
