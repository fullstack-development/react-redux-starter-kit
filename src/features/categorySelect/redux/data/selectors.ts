import { createSelector } from 'reselect';
import { ICommunicationState } from 'shared/helpers/redux';
import { IReduxState, ICategory } from '../../namespace';

function selectCategories(state: IReduxState): ICategory[] {
  return state.data.options;
}

function selectChosenCategory(state: IReduxState): number | null {
  return state.data.selected;
}

const selectChosenCategoryObject = createSelector<IReduxState, ICategory[], number | null, ICategory | undefined>(
  selectCategories,
  selectChosenCategory,
  (categories: ICategory[], uid: number | null) => {
    return categories.find((category: ICategory) => category.uid === uid);
  },
);

function selectCategoriesFetching(state: IReduxState): ICommunicationState {
  return state.communications.categoriesFetching;
}

export {
  selectCategories,
  selectChosenCategory,
  selectChosenCategoryObject,
  selectCategoriesFetching,
};
