import { call, put, takeLatest, select } from 'redux-saga/effects';

import { IDependencies, IAppReduxState } from 'shared/types/app';
import getErrorMsg from 'shared/helpers/getErrorMessage';

import { saveFieldsFail, saveFieldsSuccess } from '../actions/communication';
import { ISaveFields, IOrderFormRequest, IOrderFormResponse } from '../../namespace';

import { IPoint } from 'shared/types/models';
import { Namespace as DynamicFields, selectors as dynamicFieldsSelectors } from 'features/dynamicFields';
import { Namespace as LocationSelect, selectors as locationSelectors } from 'features/locationSelect';
type SelectedLocation = LocationSelect.SelectedLocation;

const saveFieldsType: ISaveFields['type'] = 'HOME_MODULE:SAVE_FIELDS';

export function* rootSaga(deps: IDependencies) {
  yield takeLatest(saveFieldsType, saveFieldsSaga, deps);
}

export function* saveFieldsSaga({ api }: IDependencies) {
  const state: IAppReduxState = yield select();

  const dynamicValues = dynamicFieldsSelectors.selectFlatValues(state.dynamicFields);
  const locationValues = dynamicFieldsSelectors.selectLocationValues(state.dynamicFields);
  const location =  locationSelectors.selectSelectedLocation(state);

  if (!location) {
    yield put(saveFieldsFail('Location is not set'));
    return;
  }

  const fromLocation = getFromLocation(locationValues, location);

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
    const response: IOrderFormResponse = yield call(api.saveFields, data);
    yield put(saveFieldsSuccess(response));
  } catch (err) {
    yield put(saveFieldsFail(getErrorMsg(err)));
  }
}

function getFromLocation(dynamicFields: DynamicFields.ILocationProperties, locationSelect: SelectedLocation): IPoint {
  if (dynamicFields.from && dynamicFields.from.lat && dynamicFields.from.lng) {
    return dynamicFields.from;
  } else if (locationSelect && locationSelect.point && locationSelect.point.lat && locationSelect.point.lng) {
    return locationSelect.point;
  }
  return { lat: 0, lng: 0 };
}
