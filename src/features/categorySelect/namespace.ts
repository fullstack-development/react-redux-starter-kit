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

export type IChooseCategoryAction = IAction<'CATEGORY_SELECT:CHOOSE_CATEGORY', IReduxField<Uid>>;
export type ILoadCategoriesAction = IPlainAction<'CATEGORY_SELECT:LOAD_CATEGORIES'>;
export type ILoadCategoriesCompletedAction = IAction<'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', ICategory[]>;
export type ILoadCategoriesFailAction = IPlainFailAction<'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL'>;

export type Action =
  | IChooseCategoryAction
  | ILoadCategoriesAction
  | ILoadCategoriesCompletedAction
  | ILoadCategoriesFailAction;
