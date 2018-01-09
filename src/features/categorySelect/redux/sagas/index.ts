import { takeLatest, call, put } from 'redux-saga/effects';
import getErrorMsg from 'shared/helpers/getErrorMsg';

import * as actions from '../actions';

import { IDependencies } from 'shared/types/app';
import { ICategory } from 'shared/types/models';
import * as NS from '../../namespace';

const loadCategoriesType: NS.ILoadCategories['type'] = 'CATEGORY_SELECT:LOAD_CATEGORIES';

export function getSaga(deps: IDependencies) {
  return function* saga() {
    yield takeLatest(loadCategoriesType, executeCategoriesLoading, deps);
  };
}

export function* executeCategoriesLoading({ api }: IDependencies) {
  try {
    const response: ICategory[] = yield call(api.loadCategories);
    yield put(actions.loadCategoriesSuccess(response));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.loadCategoriesFail(message));
  }
}

export default getSaga;
