import { makeCommunicationActionCreators } from 'redux-make-communication';
import { Uid } from 'shared/types/app';
import * as NS from './../../namespace';

export const { execute: loadCategories, completed: loadCategoriesSuccess, failed: loadCategoriesFail } =
  makeCommunicationActionCreators<NS.ILoadCategories, NS.ILoadCategoriesSuccess, NS.ILoadCategoriesFail>(
    'CATEGORY_SELECT:LOAD_CATEGORIES',
    'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED',
    'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL',
  );

export function chooseCategory(categoryUid: Uid): NS.IChooseCategory {
  return { type: 'CATEGORY_SELECT:CHOOSE_CATEGORY', payload: { value: categoryUid, error: '' } };
}
