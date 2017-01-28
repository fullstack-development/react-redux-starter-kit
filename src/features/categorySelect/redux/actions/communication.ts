import { Action } from './../../namespace';

function loadCategories(): Action {
  return { type: 'CATEGORY_SELECT:LOAD_CATEGORIES' };
}

function chooseCategory(categoryUid: number): Action {
  return {
    type: 'CATEGORY_SELECT:CATEGORY_SELECTED',
    payload: categoryUid,
  };
}

export {
  loadCategories,
  chooseCategory,
};
