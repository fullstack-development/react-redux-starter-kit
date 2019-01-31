import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { IUser } from 'shared/types/models';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import * as actions from './actions';

function getSaga(deps: IDependencies) {
  const searchUserType: NS.ISearchUser['type'] = 'GITHUB_SEARCH:SEARCH_USER';
  return function* saga(): SagaIterator {
    yield all([
      takeLatest(searchUserType, executeSearchUser, deps),
    ]);
  };
}

function* executeSearchUser({ api }: IDependencies, { payload }: NS.ISearchUser) {
  try {
    const { queryText, options } = payload;
    const foundUsers: IUser[] = yield call(api.searchUser, queryText, options);
    yield put(actions.searchUserSuccess(foundUsers));
  } catch (error) {
    yield put(actions.searchUserFail(getErrorMsg(error)));
  }
}

export { getSaga };
