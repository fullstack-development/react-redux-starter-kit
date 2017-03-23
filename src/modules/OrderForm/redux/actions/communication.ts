import { IReduxState, IDependencies, AsyncActionCreatorResult } from 'shared/types/app';
import { Dispatch } from 'redux';
import { IOrderFormResponse, IOrderFormRequest } from '../../namespace';
import { Namespace as DynamicFields, selectors as dynamicFieldsSelectors } from 'features/dynamicFields';
import { Namespace as LocationSelect, selectors as locationSelectors } from 'features/locationSelect';

type Point = LocationSelect.IPoint;
type SelectedLocation = LocationSelect.SelectedLocation;
type FlatFormProperties = DynamicFields.IFlatFormProperties;
type LocationProperties = DynamicFields.ILocationProperties;

function getFromLocation(dynamicFields: DynamicFields.ILocationProperties, locationSelect: SelectedLocation): Point {
  if (dynamicFields.from && dynamicFields.from.lat && dynamicFields.from.lng) {
    return dynamicFields.from;
  } else if (locationSelect && locationSelect.point && locationSelect.point.lat && locationSelect.point.lng) {
    return locationSelect.point;
  }
  return { lat: 0, lng: 0 };
}

function saveFields(): AsyncActionCreatorResult {
  return async (dispatch: Dispatch<any>, getState: () => IReduxState, { api }: IDependencies) => {
    dispatch({ type: 'HOME_MODULE:SAVE_FIELDS' });
    const state: IReduxState = getState();

    const dynamicValues: FlatFormProperties = dynamicFieldsSelectors.selectFlatValues(state.dynamicFields);
    const locationValues: LocationProperties = dynamicFieldsSelectors.selectLocationValues(state.dynamicFields);
    const location: SelectedLocation | null =  locationSelectors.selectSelectedLocation(state);

    if (!location) {
      dispatch({ type: 'HOME_MODULE:SAVE_FIELDS_FAILED', payload: 'Location is not set' });
      return;
    }
    const fromLocation: Point = getFromLocation(locationValues, location);

    const data: IOrderFormRequest = {
      attributes: dynamicValues,
      category: state.categorySelect.data.selected as number,
      location: location.area,
      // TODO: fill other properties below
      coord_from_lng: fromLocation.lng,
      coord_from_lat: fromLocation.lat,
      coord_to_lng: locationValues.to.lng,
      coord_to_lat: locationValues.to.lat,

      description: '',
      notify: false,
    };

    try {
      const response: IOrderFormResponse = await api.saveFields(data);
      dispatch({ type: 'HOME_MODULE:SAVE_FIELDS_COMPLETED', payload: response });
    } catch (err) {
      dispatch({ type: 'HOME_MODULE:SAVE_FIELDS_FAILED', payload: err });
      throw err;
    }
  };
}

export {
  saveFields,
};
