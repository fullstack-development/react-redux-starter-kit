import { IReduxState, ICategory } from '../namespace';
import { IAppReduxState } from 'shared/types/app';
import { ICommunicationState, IReduxField } from 'shared/helpers/redux';

function selectFeatureState(state: IAppReduxState): IReduxState {
  if (!state.categorySelect) {
    throw new Error('Cannot find categorySelect feature state!');
  }

  return state.categorySelect;
}

export function selectCategories(state: IAppReduxState): ICategory[] {
  return selectFeatureState(state).data.categories;
}

export function selectChosenCategory(state: IAppReduxState): IReduxField<number | null> {
  return selectFeatureState(state).edit.selectedCategoryUid;
}

export function selectCategoriesFetching(state: IAppReduxState): ICommunicationState {
  return selectFeatureState(state).communications.categoriesFetching;
}
