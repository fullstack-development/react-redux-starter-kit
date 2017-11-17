import * as NS from './../../namespace';

export function loadCategories(): NS.ILoadCategoriesAction {
  return { type: 'CATEGORY_SELECT:LOAD_CATEGORIES' };
}

export function chooseCategory(categoryUid: number): NS.IChooseCategoryAction {
  return {
    type: 'CATEGORY_SELECT:CHOOSE_CATEGORY',
    payload: categoryUid,
  };
}
