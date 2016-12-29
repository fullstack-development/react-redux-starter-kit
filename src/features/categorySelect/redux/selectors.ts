import { createSelector } from 'reselect';
import CategorySelect from '../namespace';

function selectCategories(state: CategorySelect.InitialState): CategorySelect.Category[] {
  return state.data.options;
}

function selectChosenCategory (state: CategorySelect.InitialState): number | undefined {
  return state.data.selected;
}

const selectChosenCategoryObject: () => CategorySelect.Category = createSelector(
  [ selectCategories, selectChosenCategory ],
  (categories: CategorySelect.Category[], uid: number) => {
    return categories.find((category: CategorySelect.Category) => category.uid === uid);
  },
);

function selectCategoriesFetching(state: CategorySelect.InitialState): CategorySelect.Communication {
  return state.communications.categoriesFetching;
}

export {
  selectCategories,
  selectChosenCategory,
  selectChosenCategoryObject,
  selectCategoriesFetching,
};

export default {
  selectCategories,
  selectChosenCategory,
  selectChosenCategoryObject,
  selectCategoriesFetching,
};
