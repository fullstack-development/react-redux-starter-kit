import { ICategoriesResponse } from 'shared/api/Api';
import { ICommunicationState, IReduxField } from 'shared/helpers/redux';
import { Uid } from 'shared/types/app';

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

export interface ICategory {
  uid: Uid;
  name: string;
  id: number;
}

export interface ICategorySelected {
  type: 'CATEGORY_SELECT:CATEGORY_SELECTED';
  payload: IReduxField<Uid>;
}

export interface ILoadCategories {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES';
}

export interface ILoadCategoriesSuccess {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS';
  payload: ICategoriesResponse;
}

export interface ILoadCategoriesFail {
  type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL';
  error: string;
}

export type Action = ICategorySelected | ILoadCategories | ILoadCategoriesSuccess | ILoadCategoriesFail;
