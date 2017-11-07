import { IDependencies } from 'shared/types/app';
import { takeLatest, call, put } from 'redux-saga/effects';
import { ICategoriesResponse } from 'shared/api/Api';
import getErrorMsg from 'shared/helpers/getErrorMessage';

export function* rootSaga(deps: IDependencies) {
  yield [
    takeLatest('CATEGORY_SELECT:LOAD_CATEGORIES', executeCategoriesLoading, deps),
  ];
}

function* executeCategoriesLoading({ api }: IDependencies) {
  try {
    const response: ICategoriesResponse = yield call(api.loadCategories);
    yield put({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: response });
  } catch (error) {
    const message = getErrorMsg(error);
    yield put({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', payload: message });
  }
}

export { executeCategoriesLoading as executeCategoriesLoadingSaga };
export default rootSaga;
