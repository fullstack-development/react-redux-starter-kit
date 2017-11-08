import { ICategoriesResponse } from 'shared/api/Api';
import { IAction, IPlainAction } from 'shared/types/app';

export interface ICategory {
  uid: number;
  name: string;
  id: number;
}

export interface ICommunication {
  isRequesting: boolean;
  error: string;
}

export interface IData {
  options: ICategory[];
  selected: number | null;
}

export interface IReduxState {
  communications: {
    categoriesFetching: ICommunication;
  };
  data: IData;
}

export type IChooseCategoryAction = IAction<'CATEGORY_SELECT:CHOOSE_CATEGORY', number>;
export type ILoadCategoriesAction = IPlainAction<'CATEGORY_SELECT:LOAD_CATEGORIES'>;
export type ILoadCategoriesCompletedAction = IAction<'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', ICategoriesResponse>;
export type ILoadCategoriesFailedAction = IAction<'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', string>;

export type CategorySelectAction =
  | IChooseCategoryAction
  | ILoadCategoriesAction
  | ILoadCategoriesCompletedAction
  | ILoadCategoriesFailedAction;
