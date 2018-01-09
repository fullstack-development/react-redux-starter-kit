import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: loadCities, completed: loadCitiesSuccess, failed: loadCitiesFail } =
  makeCommunicationActionCreators<NS.ILoadCities, NS.ILoadCitiesSuccess, NS.ILoadCitiesFail>(
    'LOCATION_SELECT:LOAD_CITIES', 'LOCATION_SELECT:LOAD_CITIES_SUCCESS', 'LOCATION_SELECT:LOAD_CITIES_FAIL',
  );
