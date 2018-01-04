import { ICommunication, IReduxField, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';
import { ICategory } from 'shared/types/models';
import { Uid } from 'shared/types/app';

export interface IReduxState {
  data: {
    categories: ICategory[];
  };
  edit: {
    selectedCategoryUid: IReduxField<Uid | null>;
  };
  communications: {
    categoriesFetching: ICommunication;
  };
}

export type IChooseCategory = IAction<'CATEGORY_SELECT:CHOOSE_CATEGORY', IReduxField<Uid>>;
export type ILoadCategories = IPlainAction<'CATEGORY_SELECT:LOAD_CATEGORIES'>;
export type ILoadCategoriesSuccess = IAction<'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', ICategory[]>;
export type ILoadCategoriesFail = IPlainFailAction<'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL'>;

export type Action =
  | IChooseCategory | ILoadCategories | ILoadCategoriesSuccess | ILoadCategoriesFail;
