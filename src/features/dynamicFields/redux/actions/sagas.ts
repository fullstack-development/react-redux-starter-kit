import { IDependencies, IAction } from 'shared/types/app';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IFieldsResponse } from 'shared/api/Api';
import getErrorMsg from 'shared/helpers/getErrorMessage';
import { loadFieldsSuccessed, loadFieldsFailed } from './communication';

function* executeLoadFieldsSaga({ api }: IDependencies, action?: IAction) {
  if (!action) {
    return;
  }

  try {
    const uid = action.payload as number;
    const response: IFieldsResponse = yield call(api.loadFields, uid);
    yield put(loadFieldsSuccessed(response));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(loadFieldsFailed(message));
  }
}

function getSaga(deps: IDependencies): () => SagaIterator {

  function* executeLoadFields(action?: IAction) {
    yield executeLoadFieldsSaga(deps, action);
  }

  function* saga(): SagaIterator {
    yield [
      takeLatest('DYNAMIC_FIELDS:LOAD_FIELDS', executeLoadFields),
    ];
  }

  return saga;
}

export { executeLoadFieldsSaga };
export default getSaga;
