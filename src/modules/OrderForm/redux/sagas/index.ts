import { call, put, takeLatest } from 'redux-saga/effects';
import getErrorMsg from 'shared/helpers/getErrorMsg';

import { IDependencies } from 'shared/types/app';
import { IPoint, INormalizedLocation, ITravelOrder, ILocationProperties } from 'shared/types/models';
import * as NS from '../../namespace';

import { saveFieldsFail, saveFieldsSuccess } from '../actions/communication';

const saveFieldsType: NS.ISaveFields['type'] = 'ORDER_FORM_MODULE:SAVE_FIELDS';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield takeLatest(saveFieldsType, saveFieldsSaga, deps);
  };
}

export function* saveFieldsSaga({ api }: IDependencies, action: NS.ISaveFields) {
  const { chosenCategoryUid, chosenLocation, dynamicValues, locationValues } = action.payload;

  if (!chosenLocation) {
    yield put(saveFieldsFail('Location is not set'));
    return;
  }
  if (!chosenCategoryUid) {
    yield put(saveFieldsFail('category is null'));
    return;
  }
  const fromLocation = getFromLocation(locationValues, chosenLocation);
  const travelOrder: ITravelOrder = {
    options: dynamicValues,
    fromLocation,
    location: chosenLocation,
    locationValues,
    chosenCategoryUid,
  };

  try {
    const message: string = yield call(api.createTravelOrder, travelOrder);
    yield put(saveFieldsSuccess({ message }));
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
