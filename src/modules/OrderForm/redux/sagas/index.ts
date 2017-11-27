import { call, put, takeLatest, select } from 'redux-saga/effects';

import { IDependencies, IAppReduxState } from 'shared/types/app';
import getErrorMsg from 'shared/helpers/getErrorMessage';
import { IPoint, INormalizedLocation, ITravelOrder, ILocationProperties } from 'shared/types/models';
import * as categorySelectFeature from 'features/categorySelect';
import { selectors as locationSelectors } from 'features/locationSelect/redux';
import { selectors as dynamicFieldsSelectors } from 'features/dynamicFields/redux';

import * as NS from '../../namespace';
import { saveFieldsFail, saveFieldsCompleted } from '../actions/communication';

const saveFieldsType: NS.ISaveFieldsAction['type'] = 'ORDER_FORM_MODULE:SAVE_FIELDS';

export default function getSaga(deps: IDependencies) {
  function* saga() {
    yield takeLatest(saveFieldsType, saveFieldsSaga, deps);
  }

  return saga;
}

export function* saveFieldsSaga({ api }: IDependencies, action: NS.ISaveFieldsAction | undefined) {
  const state: IAppReduxState = yield select();

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
  const options = dynamicFieldsSelectors.selectFlatValues(state.dynamicFields);
  const locationValues = dynamicFieldsSelectors.selectLocationValues(state.dynamicFields);
  const fromLocation = getFromLocation(locationValues, location);
  const travelOrder: ITravelOrder = {
    options,
    fromLocation,
    location,
    locationValues,
    chosenCategoryUid,
  };

  try {
    const message: string = yield call(api.createTravelOrder, travelOrder);
    yield put(saveFieldsCompleted({ message }));
  } catch (err) {
    yield put(saveFieldsFail(getErrorMsg(err)));
  }
}

function getFromLocation(dynamicFields: ILocationProperties, locationSelect: INormalizedLocation): IPoint {
  if (dynamicFields.from && dynamicFields.from.lat && dynamicFields.from.lng) {
    return dynamicFields.from;
  } else if (locationSelect && locationSelect.point && locationSelect.point.lat && locationSelect.point.lng) {
    return locationSelect.point;
  }
  return { lat: 0, lng: 0 };
}
