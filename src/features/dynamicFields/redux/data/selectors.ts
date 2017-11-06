import {
  isGeosuggestOption,
  IGeosuggestOption,
} from 'shared/view/components/GenericLocationInput/GenericLocationInput';

import { IReduxState } from '../../namespace';
import { IFields, IFormProperties, ILocationProperties, IAttributes } from 'shared/types/models';
import { ICommunicationState } from 'shared/helpers/redux';

function selectFields(state: IReduxState): IFields {
  return state.data.fields;
}

function selectCommunication(state: IReduxState): { fetching: ICommunicationState } {
  return state.communications;
}

function selectValues(state: IReduxState): IFormProperties {
  return state.data.values;
}

function selectFlatValues(state: IReduxState): IAttributes {
  const fields = selectValues(state);
  return Object
    .keys(fields)
    .reduce<IAttributes>((acc: IAttributes, key: string): IAttributes => {
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
