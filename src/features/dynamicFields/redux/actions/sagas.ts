import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { IDependencies } from 'shared/types/app';
import getErrorMsg from 'shared/helpers/getErrorMessage';

import { loadFieldsCompleted, loadFieldsFailed } from './communication';
import { Action } from '../../namespace';

import { IFields } from 'shared/types/models';

function getSaga({ api }: IDependencies): () => SagaIterator {
  function* executeLoadFields(action?: Action) {
    if (!action) {
      return;
    }

    try {
      const uid = action.payload as number;
      const response: IFields = yield call(api.loadFields, uid);
      yield put(loadFieldsCompleted(response));
    } catch (error) {
      const message = getErrorMsg(error);
      yield put(loadFieldsFailed(message));
    }
  }

  function* saga(): SagaIterator {
    yield [
      takeLatest('DYNAMIC_FIELDS:LOAD_FIELDS', executeLoadFields),
    ];
  }

  return saga;
}

export default getSaga;
