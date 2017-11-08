import { call, put, takeLatest, select } from 'redux-saga/effects';

import { IDependencies, IAppReduxState } from 'shared/types/app';
import getErrorMsg from 'shared/helpers/getErrorMessage';

import { saveFieldsFail, saveFieldsSuccess } from '../actions/communication';
import { ISaveFields, IOrderFormRequest, IOrderFormResponse } from '../../namespace';

import * as categorySelectFeature from 'features/categorySelect';
import { Namespace as DynamicFields, selectors as dynamicFieldsSelectors } from 'features/dynamicFields';
import { Namespace as LocationSelect, selectors as locationSelectors } from 'features/locationSelect';
type Point = LocationSelect.IPoint;
type SelectedLocation = LocationSelect.SelectedLocation;

const saveFieldsType: ISaveFields['type'] = 'HOME_MODULE:SAVE_FIELDS';

export function* rootSaga(deps: IDependencies) {
  yield takeLatest(saveFieldsType, saveFieldsSaga, deps);
}

export function* saveFieldsSaga({ api }: IDependencies) {
  const state: IAppReduxState = yield select();

  const dynamicValues = dynamicFieldsSelectors.selectFlatValues(state.dynamicFields);
  const locationValues = dynamicFieldsSelectors.selectLocationValues(state.dynamicFields);
  const location = locationSelectors.selectSelectedLocation(state);
  const chosenCategoryUid = categorySelectFeature.selectors.selectChosenCategoryUid(state).value;

  if (!location) {
    yield put(saveFieldsFail('Location is not set'));
    return;
  }

  if (!chosenCategoryUid) {
    yield put(saveFieldsFail('category is null'));
    return;
  }

  const fromLocation = getFromLocation(locationValues, location);

  const data: IOrderFormRequest = {
    attributes: dynamicValues,
    category: chosenCategoryUid,
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

function getFromLocation(dynamicFields: DynamicFields.ILocationProperties, locationSelect: SelectedLocation): Point {
  if (dynamicFields.from && dynamicFields.from.lat && dynamicFields.from.lng) {
    return dynamicFields.from;
  } else if (locationSelect && locationSelect.point && locationSelect.point.lat && locationSelect.point.lng) {
    return locationSelect.point;
  }
  return { lat: 0, lng: 0 };
}
