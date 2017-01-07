import initialState from '../initial';
import { Map, fromJS } from 'immutable';
import { IAction } from 'shared/types/app';
import Namespace from '../../namespace';
import Point = Namespace.Point;

function reducer(state: Namespace.InitialState = initialState, action: IAction): Namespace.InitialState {
  const imState: Map<string, any> = fromJS(state);

  switch (action.type) {
  case 'LOCATION_SELECT:LOAD_CITIES_SUCCESS': {
    const data: Namespace.NormalizedCitiesResponse = action.payload as Namespace.NormalizedCitiesResponse;
    return imState
      .setIn(['data', 'entities'], data.entities)
      .setIn(['data', 'citiesSet'], data.result)
      .toJS();
  }
  case 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID': {
    interface IPayload { location: { areaId: number, point: Point | null } | null; showOnMap: boolean; };
    const payload = (action.payload as IPayload);
    const showOnMap: boolean = (action.payload as IPayload).showOnMap;

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
}

export default reducer;
