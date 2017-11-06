import { call, put, takeLatest, select } from 'redux-saga/effects';

import { IDependencies, IAppReduxState } from 'shared/types/app';
import getErrorMsg from 'shared/helpers/getErrorMessage';

import { saveFieldsFail, saveFieldsSuccess } from '../actions/communication';
import { ISaveFields } from '../../namespace';

import { IPoint, ILocation, ITravelOrder, ILocationProperties } from 'shared/types/models';
import { selectors as dynamicFieldsSelectors } from 'features/dynamicFields';
import { selectors as locationSelectors } from 'features/locationSelect';

const saveFieldsType: ISaveFields['type'] = 'HOME_MODULE:SAVE_FIELDS';

export function* rootSaga(deps: IDependencies) {
  yield takeLatest(saveFieldsType, saveFieldsSaga, deps);
}

export function* saveFieldsSaga({ api }: IDependencies) {
  const state: IAppReduxState = yield select();

  const location = locationSelectors.selectSelectedLocation(state);
  const selectedCategoryUid = state.categorySelect.data.selected;

  if (!location) {
    yield put(saveFieldsFail('Location is not set'));
    return;
  }
  if (!selectedCategoryUid) {
    yield put(saveFieldsFail('Selected category is null'));
    return;
  }

  const options = dynamicFieldsSelectors.selectFlatValues(state.dynamicFields);
  const locationValues = dynamicFieldsSelectors.selectLocationValues(state.dynamicFields);
  const fromLocation = getFromLocation(locationValues, location);
  const travelOrder: ITravelOrder = {
    options,
    fromLocation,
    location,
    locationValues,
    selectedCategoryUid,
  };

  try {
    const message: string = yield call(api.createTravelOrder, travelOrder);
    yield put(saveFieldsSuccess(message));
  } catch (err) {
    yield put(saveFieldsFail(getErrorMsg(err)));
  }
}

function getFromLocation(dynamicFields: ILocationProperties, locationSelect: ILocation): IPoint {
  if (dynamicFields.from && dynamicFields.from.lat && dynamicFields.from.lng) {
    return dynamicFields.from;
  } else if (locationSelect && locationSelect.point && locationSelect.point.lat && locationSelect.point.lng) {
    return locationSelect.point;
  }
  return { lat: 0, lng: 0 };
}
