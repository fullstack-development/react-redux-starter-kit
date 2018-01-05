import {
  isGeosuggestOption, IGeosuggestOption,
} from 'shared/view/components/GenericLocationInput/GenericLocationInput';

import { IFields, IFormProperties, ILocationProperties, IFlatFormProperties } from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import { IReduxState } from '../../namespace';

export function selectFields(state: IReduxState): IFields {
  return state.data.fields;
}

export function selectCommunication(state: IReduxState): { fetching: ICommunication } {
  return state.communication;
}

export function selectValues(state: IReduxState): IFormProperties {
  return state.data.values;
}

export function selectFlatValues(state: IReduxState): IFlatFormProperties {
  const fields = selectValues(state);
  return Object
    .keys(fields)
    .reduce<IFlatFormProperties>((acc: IFlatFormProperties, key: string): IFlatFormProperties => {
      const value: string | number | IGeosuggestOption = fields[key];
      return isGeosuggestOption(value) ? { ...acc, [key]: value.label } : { ...acc, [key]: value };
    }, {});
}

export function selectLocationValues(state: IReduxState): ILocationProperties {
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
