import { takeLatest, put, call, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { IDependencies } from 'shared/types/app';

import * as actions from './actions';
import * as NS from '../namespace';

export default function getSaga(deps: IDependencies) {
  const setNotificationType: NS.ISetNotification['type'] = 'NOTIFICATION:SET_NOTIFICATION';

  function* saga() {
    yield all([
      takeLatest(setNotificationType, executeSetNotificationSaga, deps),
    ]);
  }

  return saga;
}

export function* executeSetNotificationSaga() {
  yield call(delay, 10000);
  yield put(actions.removeNotification());
}
