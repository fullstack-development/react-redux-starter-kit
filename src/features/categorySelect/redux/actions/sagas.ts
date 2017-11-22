import { IDependencies } from 'shared/types/app';
import { takeLatest, call, put } from 'redux-saga/effects';
import getErrorMsg from 'shared/helpers/getErrorMessage';

import { ICategory } from 'shared/types/models';

function getSaga({ api }: IDependencies) {
  function* executeCategoriesLoading() {
    try {
      const categories: ICategory[] = yield call(api.loadCategories);
      yield put({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: categories });
    } catch (error) {
      const message = getErrorMsg(error);
      yield put({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', payload: message });
    }
  }

  function* saga() {
    yield [
      takeLatest('CATEGORY_SELECT:LOAD_CATEGORIES', executeCategoriesLoading),
    ];
  }

  return saga;
}

export default getSaga;
