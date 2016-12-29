import { IAction } from 'shared/types/app';
import LocationSelect from '../../namespace';

type Point = LocationSelect.Point;

function selectLocationByAreaId(location: {areaId: number, point: Point | null} | null, showOnMap: boolean): IAction {
  return { type: 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID', payload: { location, showOnMap } };
}

export {
  selectLocationByAreaId
}
