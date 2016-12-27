import AppRedux from 'shared/types/app';
import { Dispatch } from 'redux';
import { normalize, Schema, arrayOf } from 'normalizr';
import normalizeKey from 'shared/helpers/normalizeKey';
import Namespace from '../../namespace';

/* Define schema for normalizing */
// TODO: move to separate file
const city = new Schema('cities');
const area = new Schema('areas');
city.define({ areas: arrayOf(area) });


function loadCities(): AppRedux.AsyncActionCreatorResult {
  return async(
    dispatch: Dispatch<any>,
    getState: Function,
    { api }: AppRedux.ExtraArguments
  ) => {
    dispatch({ type: 'LOCATION_SELECT:LOAD_CITIES' });

    try {
      const response = await api.loadCities();
      const data: Namespace.NormalizedCitiesResponse = normalize(
        response,
        arrayOf(city),
        {
          assignEntity(output: any, key: string, value: any) {
            output[key] = value;
            normalizeKey(output, key);
            if (key === 'point') {
              const point = output[key].split(',').map((val: string) => parseFloat(val.trim()));
              output[key] = { lat: point[0], lng: point[1] };
            }
          }
        }
      );

      dispatch({ type: 'LOCATION_SELECT:LOAD_CITIES_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'LOCATION_SELECT:LOAD_CITIES_FAILED', payload: err });
      throw err;
    }
  };
}

export {
  loadCities,
};
