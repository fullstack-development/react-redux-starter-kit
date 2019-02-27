import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';
import { IRepositoriesSearchResults } from 'shared/types/githubSearch';
import { actions as notificationServiceActions } from 'services/notification';

import * as NS from '../namespace';
import * as actions from './actions';

function getSaga(deps: IDependencies) {
  const searchRepositoriesType: NS.ISearchRepositories['type'] = 'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES';
  return function* saga(): SagaIterator {
    yield all([
      takeLatest(searchRepositoriesType, executeSearchRepositories, deps),
    ]);
  };
}

function* executeSearchRepositories({ api }: IDependencies, { payload }: NS.ISearchRepositories) {
  try {
    const { searchOptions, page } = payload;
    const { searchString, ...filters } = searchOptions;
    const searchResults: IRepositoriesSearchResults = yield call(
      api.searchRepositories, searchString, filters, page,
    );
    yield put(actions.searchRepositoriesSuccess({ ...searchResults, page }));
    if (searchResults.data.length === 0) {
      yield put(notificationServiceActions.setNotification({ kind: 'error', text: 'No repositories found :(' }));
    }
  } catch (error) {
    const errorMsg = getErrorMsg(error);
    yield put(actions.searchRepositoriesFail(errorMsg));
    yield put(notificationServiceActions.setNotification({ kind: 'error', text: errorMsg }));
  }
}

export { getSaga };
