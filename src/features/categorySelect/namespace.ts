import { ICommunicationState, IReduxField, IPlainFailAction } from 'shared/helpers/redux';
import { ICategory } from 'shared/types/models';
import { Uid, IAction, IPlainAction } from 'shared/types/app';

export interface IReduxState {
  data: {
    categories: ICategory[];
  };
  edit: {
    selectedCategoryUid: IReduxField<Uid | null>;
  };
  communications: {
    categoriesFetching: ICommunicationState;
  };
}

export type ICategorySelected = IAction<'CATEGORY_SELECT:CATEGORY_SELECTED', IReduxField<Uid>>;
export type ILoadCategories = IPlainAction<'CATEGORY_SELECT:LOAD_CATEGORIES'>;
export type ILoadCategoriesSuccess = IAction<'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS', ICategory[]>;
export type ILoadCategoriesFail = IPlainFailAction<'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL'>;

export type Action = ICategorySelected | ILoadCategories | ILoadCategoriesSuccess | ILoadCategoriesFail;
