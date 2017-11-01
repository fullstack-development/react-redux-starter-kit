import {
  isGeosuggestOption,
  IGeosuggestOption,
} from 'shared/view/components/GenericLocationInput/GenericLocationInput';
import {
  ICommunication,
  IReduxState,
  ILocationProperties,
  IFlatFormProperties,
  IFormProperties,
  IFields,
} from '../../namespace';

function selectFields(state: any): IFields {
  return state.data.fields;
}

function selectCommunication(state: any): {fetching: ICommunication} {
  return state.communications;
}

function selectValues(state: any): IFormProperties {
  return state.data.values;
}

function selectFlatValues(state: any): IFlatFormProperties {
  const fields = selectValues(state);
  return Object
    .keys(fields)
    .reduce<IFlatFormProperties>((acc: IFlatFormProperties, key: string): IFlatFormProperties => {
      const value: string | number | IGeosuggestOption = fields[key];
      return isGeosuggestOption(value) ? { ...acc, [key]: value.label } : { ...acc, [key]: value };
    }, {});
}

function selectLocationValues(state: any): ILocationProperties {
  const fields = selectValues(state);
  return Object
    .keys(fields)
    .reduce<ILocationProperties>((acc: ILocationProperties, key: string): ILocationProperties => {
      const value: string | number | IGeosuggestOption = fields[key];
      if (isGeosuggestOption(value)) {
        return {
          ...acc,
          [key]: value.location ? value.location : { lat: 0, lng: 0 },
        };
      } else {
        return acc;
      }
    }, {} as ILocationProperties);
}

export {
  selectFields,
  selectValues,
  selectFlatValues,
  selectLocationValues,
  selectCommunication,
};

export default {
  selectFields,
  selectValues,
  selectFlatValues,
  selectLocationValues,
  selectCommunication,
};
