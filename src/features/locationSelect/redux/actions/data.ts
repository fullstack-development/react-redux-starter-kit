import AppRedux from 'shared/types/app';
import LocationSelect from '../../namespace';
import Point = LocationSelect.Point;

function selectLocationByAreaId(location: {areaId: number, point: Point | null} | null, showOnMap: boolean): AppRedux.Action {
  return { type: 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID', payload: { location, showOnMap } };
}

export {
  selectLocationByAreaId
}
