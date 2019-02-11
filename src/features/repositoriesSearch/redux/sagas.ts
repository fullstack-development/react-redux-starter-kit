import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { IRepositoriesSearchResult } from 'shared/types/models';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import * as actions from './actions';

function getSaga(deps: IDependencies) {
  const searchRepositoriesType: NS.ISearchRepositories['type'] = 'REPOSITORY_SEARCH:SEARCH_REPOSITORIES';
  return function* saga(): SagaIterator {
    yield all([
      takeLatest(searchRepositoriesType, executeSearchRepositories, deps),
    ]);
  };
}

function* executeSearchRepositories({ api }: IDependencies, { payload }: NS.ISearchRepositories) {
  try {
    const { searchString, page } = payload;
    const searchResult: IRepositoriesSearchResult = yield call(api.searchRepositories, searchString, page);
    yield put(actions.searchRepositoriesSuccess({ ...searchResult, page }));
  } catch (error) {
    yield put(actions.searchRepositoriesFail(getErrorMsg(error)));
  }
}

export { getSaga };
