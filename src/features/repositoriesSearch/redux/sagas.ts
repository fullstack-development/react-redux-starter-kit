import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

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
    const { searchString, page, ...searchOptions } = payload;
    const searchResult = yield call(api.searchRepositories, searchString, searchOptions, page);
    yield put(actions.searchRepositoriesSuccess({ ...searchResult, page }));
  } catch (error) {
    yield put(actions.searchRepositoriesFail(getErrorMsg(error)));
  }
}

export { getSaga };
