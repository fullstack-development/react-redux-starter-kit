import { IDependencies } from 'shared/types/app';
import { takeLatest, call, put } from 'redux-saga/effects';
import { ICategoriesResponse } from 'shared/api/Api';
import getErrorMsg from 'shared/helpers/getErrorMessage';

function* executeCategoriesLoadingSaga({ api }: IDependencies) {
  try {
    const response: ICategoriesResponse = yield call(api.loadCategories);
    yield put({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: response });
  } catch (error) {
    const message = getErrorMsg(error);
    yield put({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', payload: message });
  }
}

function getSaga(deps: IDependencies) {
  function* executeCategoriesLoading() {
    yield executeCategoriesLoadingSaga(deps);
  }

  function* saga() {
    yield [
      takeLatest('CATEGORY_SELECT:LOAD_CATEGORIES', executeCategoriesLoading),
    ];
  }

  return saga;
}

export { executeCategoriesLoadingSaga };
export default getSaga;
