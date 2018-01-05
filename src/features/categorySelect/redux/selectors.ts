import { IAppReduxState } from 'shared/types/app';
import { ICategory } from 'shared/types/models';
import { ICommunication, IReduxField } from 'shared/types/redux';
import { IReduxState } from '../namespace';

function selectFeatureState(state: IAppReduxState): IReduxState {
  if (!state.categorySelect) {
    throw new Error('Cannot find categorySelect feature state!');
  }

  return state.categorySelect;
}

export function selectCategories(state: IAppReduxState): ICategory[] {
  return selectFeatureState(state).data.categories;
}

export function selectChosenCategoryUid(state: IAppReduxState): IReduxField<number | null> {
  return selectFeatureState(state).edit.selectedCategoryUid;
}

export function selectCategoriesFetching(state: IAppReduxState): ICommunication {
  return selectFeatureState(state).communications.categoriesFetching;
}
