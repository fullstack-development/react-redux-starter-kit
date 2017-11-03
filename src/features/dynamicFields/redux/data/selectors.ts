import {
  isGeosuggestOption,
  IGeosuggestOption,
} from 'shared/view/components/GenericLocationInput/GenericLocationInput';
import {
  ICommunication,
  ILocationProperties,
  IFlatFormProperties,
  IFormProperties,
  IFields,
  IReduxState,
} from '../../namespace';

function selectFields(state: IReduxState): IFields {
  return state.data.fields;
}

function selectCommunication(state: IReduxState): {fetching: ICommunication} {
  return state.communications;
}

function selectValues(state: IReduxState): IFormProperties {
  return state.data.values;
}

function selectFlatValues(state: IReduxState): IFlatFormProperties {
  const fields = selectValues(state);
  return Object
    .keys(fields)
    .reduce<IFlatFormProperties>((acc: IFlatFormProperties, key: string): IFlatFormProperties => {
      const value: string | number | IGeosuggestOption = fields[key];
      return isGeosuggestOption(value) ? { ...acc, [key]: value.label } : { ...acc, [key]: value };
    }, {});
}

function selectLocationValues(state: IReduxState): ILocationProperties {
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
