import { IAction } from 'shared/types/app';

function loadCategories(): IAction {
  return { type: 'CATEGORY_SELECT:LOAD_CATEGORIES' };
}

function chooseCategory(categoryUid: number): IAction {
  return {
    type: 'CATEGORY_SELECT:CATEGORY_SELECTED',
    payload: categoryUid,
  };
}

export {
  loadCategories,
  chooseCategory,
};
