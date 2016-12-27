import { createSelector } from 'reselect';
import Namespace from '../namespace';
import { isGeosuggestOption, GeosuggestOption } from 'shared/view/components/GenericLocationInput/GenericLocationInput';

function selectFields(state: Namespace.InitialState): Namespace.Fields {
  return state.data.fields;
}

function selectCommunication(state: Namespace.InitialState): {fetching: Namespace.Communication} {
  return state.communications;
}

function selectValues(state: Namespace.InitialState): Namespace.FormProperties {
  return state.data.values;
}

function selectFlatValues(state: Namespace.InitialState): Namespace.FlatFormProperties {
  const fields = selectValues(state);
  return Object.keys(fields).reduce<Namespace.FlatFormProperties>((acc: Namespace.FlatFormProperties, key: string): Namespace.FlatFormProperties => {
    const value: string | number | GeosuggestOption = fields[key];
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

function selectLocationValues(state: Namespace.InitialState): Namespace.LocationProperties {
  const fields = selectValues(state);
  return Object.keys(fields).reduce<Namespace.LocationProperties>((acc: Namespace.LocationProperties, key: string): Namespace.LocationProperties => {
    const value: string | number | GeosuggestOption = fields[key];
    if (isGeosuggestOption(value)) {
      return {
        ...acc,
        [key]: value.location ? value.location : { lat: 0, lng: 0 },
      };
    } else {
      return acc;
    }
  }, {});
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