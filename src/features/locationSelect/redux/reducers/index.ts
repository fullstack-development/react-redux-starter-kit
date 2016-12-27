import initialState from '../initial';
import { Map, fromJS } from 'immutable';
import AppRedux from 'shared/types/app';
import Namespace from '../../namespace';
import Point = Namespace.Point;

function reducer(state: Namespace.InitialState = initialState, action: AppRedux.Action): Namespace.InitialState {
  const imState: Map<string, any> = fromJS(state);

  /* tslint:disable */
  switch (action.type) {
    case 'LOCATION_SELECT:LOAD_CITIES_SUCCESS': {
      const data : Namespace.NormalizedCitiesResponse = <Namespace.NormalizedCitiesResponse> action.payload;
      return imState
        .setIn(['data', 'entities'], data.entities)
        .setIn(['data', 'citiesSet'], data.result)
        .toJS();
    }
    case 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID': {
      interface Payload { location: { areaId: number, point: Point | null } | null, showOnMap: boolean };
      const payload = (action.payload as Payload);
      const showOnMap: boolean = (action.payload as Payload).showOnMap;

      if (payload.location) {
        const areaId: number = payload.location.areaId;
        const area: Namespace.Area = imState.getIn(['data', 'entities', 'areas', areaId.toString()]).toJS();
        const city: Namespace.City = imState.getIn(['data', 'entities', 'cities', area.city.toString()]).toJS();
        const point: Namespace.Point = payload.location.point ? payload.location.point : area.point;
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
  /* tslint:enable */
}


export default reducer;
