import { makeCommunicationActionCreators } from 'shared/helpers/redux';

import * as NS from './../../namespace';
import { Uid } from 'shared/types/app';

// tslint:disable:max-line-length
export const { execute: loadCategories, completed: loadCategoriesSuccess, failed: loadCategoriesFail } =
  makeCommunicationActionCreators<NS.ILoadCategories, NS.ILoadCategoriesSuccess, NS.ILoadCategoriesFail>(
    'CATEGORY_SELECT:LOAD_CATEGORIES', 'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS', 'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL',
  );

export function chooseCategory(categoryUid: Uid): NS.ICategorySelected {
  return { type: 'CATEGORY_SELECT:CATEGORY_SELECTED', payload: { value: categoryUid, error: '' } };
}
