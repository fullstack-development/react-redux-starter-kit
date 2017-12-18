import { makeCommunicationActionCreators } from 'shared/helpers/redux';

import { Uid } from 'shared/types/app';
import * as NS from './../../namespace';

export const { execute: loadCategories, completed: loadCategoriesCompleted, failed: loadCategoriesFail } =
  makeCommunicationActionCreators<
    NS.ILoadCategoriesAction, NS.ILoadCategoriesCompletedAction, NS.ILoadCategoriesFailAction
    >(
    'CATEGORY_SELECT:LOAD_CATEGORIES',
    'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED',
    'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL',
  );

export function chooseCategory(categoryUid: Uid): NS.IChooseCategoryAction {
  return { type: 'CATEGORY_SELECT:CHOOSE_CATEGORY', payload: { value: categoryUid, error: '' } };
}
