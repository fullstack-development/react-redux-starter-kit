import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';
import { actions as notificationServiceActions } from 'services/notification';

import * as NS from '../namespace';
import * as actions from './actions';
import { IServerRepository } from 'services/api/types';

function getSaga(deps: IDependencies) {
  const getRepoType: NS.IGetRepository['type'] = 'PROFILE:GET_REPOSITORY';

  return function* saga(): SagaIterator {
    yield all([takeLatest(getRepoType, executeGetRepo, deps)]);
  };
}

function* executeGetRepo(
  { api }: IDependencies,
  { payload }: NS.IGetRepositoryPayload,
) {
  try {
    const repository: IServerRepository = yield call(
      api.getRepository,
      payload,
    );
    yield put(actions.getRepositorySuccess(repository));
  } catch (error) {
    const errorMsg = getErrorMsg(error);
    yield put(actions.getRepositoryFail(errorMsg));
    yield put(
      notificationServiceActions.setNotification({
        kind: 'error',
        text: errorMsg,
      }),
    );
  }
}

export { getSaga };
