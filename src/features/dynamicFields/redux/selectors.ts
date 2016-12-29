import { createSelector } from 'reselect';
import {
  isGeosuggestOption,
  IGeosuggestOption,
} from 'shared/view/components/GenericLocationInput/GenericLocationInput';
import {
  ICommunication,
  IReduxState,
  LocationProperties,
  FlatFormProperties,
  FormProperties,
  IFields,
} from '../namespace';

function selectFields(state: IReduxState): IFields {
  return state.data.fields;
}

function selectCommunication(state: IReduxState): {fetching: ICommunication} {
  return state.communications;
}

function selectValues(state: IReduxState): FormProperties {
  return state.data.values;
}

function selectFlatValues(state: IReduxState): FlatFormProperties {
  const fields = selectValues(state);
  return Object.keys(fields).reduce<FlatFormProperties>((acc: FlatFormProperties, key: string): FlatFormProperties => {
    const value: string | number | IGeosuggestOption = fields[key];
    if (isGeosuggestOption(value)) {
      return {
        ...acc,
        [key]: value.label,
      };
    } else {
      return {
        ...acc,
        [key]: value,
      };
    }
  }, {});
}

function selectLocationValues(state: IReduxState): LocationProperties {
  const fields = selectValues(state);
  return Object.keys(fields).reduce<LocationProperties>((acc: LocationProperties, key: string): LocationProperties => {
    const value: string | number | IGeosuggestOption = fields[key];
    if (isGeosuggestOption(value)) {
      return {
        ...acc,
        [key]: value.location ? value.location : { lat: 0, lng: 0 },
      };
    } else {
      return acc;
    }
  }, {} as LocationProperties);
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
