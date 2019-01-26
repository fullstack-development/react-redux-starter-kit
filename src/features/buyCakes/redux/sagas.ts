import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { ICakePreview } from 'shared/types/models';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import * as actions from './actions';

function getSaga(deps: IDependencies) {
  const loadCakesPreviewType: NS.ILoadCakesPreview['type'] = 'BUY_CAKES:LOAD_CAKES_PREVIEW';
  return function* saga(): SagaIterator {
    yield all([
      takeLatest(loadCakesPreviewType, executeLoadCakesPreview, deps),
    ]);
  };
}

function* executeLoadCakesPreview({ api }: IDependencies) {
  try {
    const cakesPreview: ICakePreview[] = yield call(api.loadCakesPreview);
    yield put(actions.loadCakesPreviewSuccess(cakesPreview));
  } catch (error) {
    yield put(actions.loadCakesPreviewFail(getErrorMsg(error)));
  }
}

export { getSaga };
