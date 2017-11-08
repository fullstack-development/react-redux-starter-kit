import * as NS from '../../namespace';

export function selectLocationByAreaId(
  payload: NS.ISelectLocationByAreaIDActionPayload,
): NS.ISelectLocationByAreaIDAction {
  return { type: 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID', payload };
}
