import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import getErrorMsg from 'shared/helpers/getErrorMsg';

import { IDependencies } from 'shared/types/app';
import { IFields } from 'shared/types/models';
import { ILoadFieldsSuccess } from '../../namespace';

import { loadFieldsSuccess, loadFieldsFail } from '../actions';

function getSaga(deps: IDependencies): () => SagaIterator {
  return function* saga(): SagaIterator {
    yield [
      takeLatest('DYNAMIC_FIELDS:LOAD_FIELDS', executeLoadFields, deps),
    ];
  };
}

function* executeLoadFields({ api }: IDependencies, action: ILoadFieldsSuccess) {
  try {
    const uid = action.payload as number;
    const response: IFields = yield call(api.loadFields, uid);
    yield put(loadFieldsSuccess(response));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(loadFieldsFail(message));
  }
}

export default getSaga;
