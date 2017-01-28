import { IDependencies, IAction } from 'shared/types/app';
import { Saga, takeLatest } from 'redux-saga';
import { Effect, call, put } from 'redux-saga/effects';
import { IFieldsResponse } from 'shared/api/Api';
import getErrorMsg from 'shared/helpers/getErrorMessage';
import { loadFieldsSuccessed, loadFieldsFailed } from './communication';

function getSaga({ api }: IDependencies): Saga {
  function* watchLoadFields() {
    yield takeLatest('DYNAMIC_FIELDS:LOAD_FIELDS', executeLoadFields);
  }

  function* executeLoadFields(effect?: Effect) {
    if (!effect) {
      return;
    }

    try {
      const uid = (effect as IAction).payload as number;
      const response: IFieldsResponse = yield call(api.loadFields, uid);
      yield put(loadFieldsSuccessed(response));
    } catch (error) {
      const message = getErrorMsg(error);
      yield put(loadFieldsFailed(message));
    }
  }

  function* saga() {
    yield [
      watchLoadFields(),
    ];
  }

  return saga;
}

export default getSaga;
