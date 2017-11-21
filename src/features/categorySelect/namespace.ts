import { ICategory } from 'shared/types/models';
import { ICommunicationState } from 'shared/helpers/redux';
import { IAction, IPlainAction } from 'shared/types/app';

export interface IData {
  options: ICategory[];
  selected: number | null;
}

export interface IReduxState {
  communications: {
    categoriesFetching: ICommunicationState;
  };
  data: IData;
}

export type IChooseCategoryAction = IAction<'CATEGORY_SELECT:CHOOSE_CATEGORY', number>;
export type ILoadCategoriesAction = IPlainAction<'CATEGORY_SELECT:LOAD_CATEGORIES'>;
export type ILoadCategoriesCompletedAction = IAction<'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', ICategory[]>;
export type ILoadCategoriesFailedAction = IAction<'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', string>;

export type CategorySelectAction =
  | IChooseCategoryAction
  | ILoadCategoriesAction
  | ILoadCategoriesCompletedAction
  | ILoadCategoriesFailedAction;
