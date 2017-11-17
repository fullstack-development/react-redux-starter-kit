import initialState from '../data/initial';
import { Map, fromJS } from 'immutable';

import { IReduxState, IPoint, IArea, ICity, INormalizedCitiesResponse, LocationSelectAction } from '../../namespace';

function reducer(state: IReduxState = initialState, action: LocationSelectAction): IReduxState {
  const imState: Map<string, any> = fromJS(state);

  switch (action.type) {
    case 'LOCATION_SELECT:LOAD_CITIES_COMPLETED': {
      const data: INormalizedCitiesResponse = action.payload;
      return imState
        .setIn(['data', 'entities'], data.entities)
        .setIn(['data', 'citiesSet'], data.result)
        .toJS();
    }
    case 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID': {
      const { location, showOnMap } = action.payload;

      if (location) {
        const areaId: number = location.areaID;
        const area: IArea = imState.getIn(['data', 'entities', 'areas', areaId.toString()]).toJS();
        const city: ICity = imState.getIn(['data', 'entities', 'cities', area.city.toString()]).toJS();
        const point: IPoint = location.point ? location.point : area.point;
        return imState
          .setIn(['data', 'selectedLocation'], { city: city.id, area: area.id, point })
          .setIn(['ui', 'showSelectedLocation'], showOnMap)
          .toJS();
      } else {
        return imState
          .setIn(['ui', 'showSelectedLocation'], showOnMap)
          .setIn(['data', 'selectedLocation'], null)
          .toJS();
      }
    }
    default:
      return state;
  }
}

export default reducer;
