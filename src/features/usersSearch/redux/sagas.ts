import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { IDetailedGithubUser } from 'shared/types/models';
import { IUsersSearchResults } from 'shared/types/githubSearch';
import { getErrorMsg } from 'shared/helpers';
import { actions as notificationServiceActions } from 'services/notification';

import * as NS from '../namespace';
import * as actions from './actions';

function getSaga(deps: IDependencies) {
  const searchUserType: NS.ISearchUsers['type'] = 'USERS_SEARCH:SEARCH_USERS';
  const loadUserDetailsType: NS.ILoadUserDetails['type'] = 'USERS_SEARCH:LOAD_USER_DETAILS';
  return function* saga(): SagaIterator {
    yield all([
      takeLatest(searchUserType, executeSearchUsers, deps),
      takeLatest(loadUserDetailsType, executeLoadUserDetails, deps),
    ]);
  };
}

function* executeSearchUsers({ api }: IDependencies, { payload }: NS.ISearchUsers) {
  try {
    const { searchOptions, page } = payload;
    const { searchString, ...filters } = searchOptions;
    const searchUsersResults: IUsersSearchResults = yield call(api.searchUsers, searchString, filters, page);
    yield put(actions.searchUsersSuccess({ ...searchUsersResults, page }));
    if (searchUsersResults.data.length === 0) {
      yield put(notificationServiceActions.setNotification({ kind: 'error', text: 'No users found :(' }));
    }
  } catch (error) {
    const errorMsg = getErrorMsg(error);
    yield put(actions.searchUsersFail(errorMsg));
    yield put(notificationServiceActions.setNotification({ kind: 'error', text: errorMsg }));
  }
}

function* executeLoadUserDetails({ api }: IDependencies, { payload }: NS.ILoadUserDetails) {
  try {
    yield put(actions.resetUserDetails());
    const userDetails: IDetailedGithubUser = yield call(api.loadUserDetails, payload);
    yield put(actions.loadUserDetailsSuccess(userDetails));
  } catch (error) {
    const errorMsg = getErrorMsg(error);
    yield put(actions.loadUserDetailsFail(errorMsg));
    yield put(notificationServiceActions.setNotification({ kind: 'error', text: errorMsg }));
  }
}

export { getSaga };
