import { IDependencies, IAction } from 'shared/types/app';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import getErrorMsg from 'shared/helpers/getErrorMessage';
import { loadFieldsSuccessed, loadFieldsFailed } from './communication';

import { IFields } from 'shared/types/models';

function getSaga({ api }: IDependencies): () => SagaIterator {
  function* executeLoadFields(action?: IAction) {
    if (!action) {
      return;
    }

    try {
      const uid = action.payload as number;
      const response: IFields = yield call(api.loadFields, uid);
      console.log(response);
      yield put(loadFieldsSuccessed(response));
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
