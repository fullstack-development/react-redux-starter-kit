import { call, put, takeLatest, select } from 'redux-saga/effects';

import { IDependencies, IAppReduxState } from 'shared/types/app';
import getErrorMsg from 'shared/helpers/getErrorMessage';

import { saveFieldsFail, saveFieldsSuccess } from '../actions/communication';
import { ISaveFields, IOrderFormRequest, IOrderFormResponse } from '../../namespace';
import { SelectedLocation, IPoint, ILocationProperties } from 'shared/types/models';

const saveFieldsType: ISaveFields['type'] = 'HOME_MODULE:SAVE_FIELDS';

export default function getSaga(deps: IDependencies) {
  function* saga() {
    yield takeLatest(saveFieldsType, saveFieldsSaga, deps);
  }

  return saga;
}

export function* saveFieldsSaga({ api }: IDependencies, { payload }: ISaveFields) {
  const state: IAppReduxState = yield select();

  const { dynamicValues, locationValues, location } = payload;

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

function getFromLocation(dynamicFields: ILocationProperties, locationSelect: SelectedLocation): IPoint {
  if (dynamicFields.from && dynamicFields.from.lat && dynamicFields.from.lng) {
    return dynamicFields.from;
  } else if (locationSelect && locationSelect.point && locationSelect.point.lat && locationSelect.point.lng) {
    return locationSelect.point;
  }
  return { lat: 0, lng: 0 };
}
