import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'shared/helpers/redux';

import { IPoint, INormalizedLocation } from 'shared/types/models';
import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import initial from '../data/initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'LOCATION_SELECT:LOAD_CITIES_SUCCESS': {
      const { entities, result } = action.payload;
      return {
        ...state,
        entities,
        citiesSet: result,
      };
    }
    case 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID': {
      const { location } = action.payload;

      let selectedLocation: INormalizedLocation | null = null;

      if (location) {
        const areaId: number = location.areaID;
        const area = state.entities.areas[areaId];
        const city = state.entities.cities[area.city];
        const point: IPoint = location.point ? location.point : area.point;

        selectedLocation = { city: city.id, area: area.id, point };
      }

      return { ...state, selectedLocation };
    }
    default: return state;
  }
}

function uiReducer(state: NS.IReduxState['ui'] = initial.ui, action: NS.Action): NS.IReduxState['ui'] {
  switch (action.type) {
    case 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID': {
      return { ...state, showSelectedLocation: action.payload.showOnMap };
    }
    default: return state;
  }
}

export default combineReducers<NS.IReduxState>({
  ui: uiReducer,
  data: dataReducer,
  communications: combineReducers<NS.IReduxState['communications']>({
    citiesFetching: makeCommunicationReducer<NS.ILoadCities, NS.ILoadCitiesSuccess, NS.ILoadCitiesFail>(
      'LOCATION_SELECT:LOAD_CITIES',
      'LOCATION_SELECT:LOAD_CITIES_SUCCESS',
      'LOCATION_SELECT:LOAD_CITIES_FAIL',
      initial.communications.citiesFetching,
    ),
  } as ReducersMap<NS.IReduxState['communications']>),
} as ReducersMap<NS.IReduxState>);
