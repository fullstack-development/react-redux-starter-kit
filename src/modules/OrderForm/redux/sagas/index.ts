import { call, put, takeLatest } from 'redux-saga/effects';

import { IDependencies } from 'shared/types/app';
import getErrorMsg from 'shared/helpers/getErrorMessage';
import { IPoint, INormalizedLocation, ITravelOrder, ILocationProperties } from 'shared/types/models';

import * as NS from '../../namespace';
import { saveFieldsFail, saveFieldsCompleted } from '../actions/communication';

const saveFieldsType: NS.ISaveFieldsAction['type'] = 'ORDER_FORM_MODULE:SAVE_FIELDS';

export default function getSaga(deps: IDependencies) {
  function* saga() {
    yield takeLatest(saveFieldsType, saveFieldsSaga, deps);
  }

  return saga;
}

export function* saveFieldsSaga({ api }: IDependencies, action: NS.ISaveFieldsAction) {
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
