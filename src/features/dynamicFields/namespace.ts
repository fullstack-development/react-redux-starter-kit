import { GeosuggestOption } from 'shared/view/components/GenericLocationInput/GenericLocationInput';

declare namespace DynamicFields {
  type FormProperties = {
    [key: string]: string | number | GeosuggestOption;
  };
  type FlatFormProperties = {
    [key: string]: string | number;
  };
  type LocationProperties = {
    [key: string]: {
      lat: number;
      lng: number;
    };
  };
  interface Field {
    type: 'string' | 'integer';
    component: 'text' | 'integer' | 'radio' | 'dropdown' | 'location' | 'date' | 'time';
    order: number;
    label: string;
    pattern: string;
    placeholder: string;
    display: number;
    'enum': Array<string>;
    minimum: number;
    maximum: number;
    minLength: number;
    maxLength: number;
  }

  interface Schema {
    properties: {[key: string]: Field};
    required: Array<string>;
    type: 'string';
    title: string;
  }

  interface Fields {
    schema?: Schema;
    id?: number;
    uid?: number;
    alert?: boolean;
    name?: number;
  }

  interface Communication {
    isRequesting: boolean;
    error: string;
  }

  interface InitialState {
    communications: {
      fetching: Communication
    };
    data: {
      fields: Fields;
      values: FormProperties;
    };
  }
}

export default DynamicFields;