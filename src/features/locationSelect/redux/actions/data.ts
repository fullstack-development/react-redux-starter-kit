import { IAction } from 'shared/types/app';
import { IPoint } from '../../namespace';

function selectLocationByAreaId(location: {areaId: number, point: IPoint | null} | null, showOnMap: boolean): IAction {
  return { type: 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID', payload: { location, showOnMap } };
}

export {
  selectLocationByAreaId,
};
