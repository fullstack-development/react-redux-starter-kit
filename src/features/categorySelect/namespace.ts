import { ICategoriesResponse } from 'shared/api/Api';

interface ICategory {
  uid: number;
  name: string;
  id: number;
}

interface ICommunication {
  isRequesting: boolean;
  error: string;
}

interface IData {
  options: ICategory[];
  selected: number | null;
}

interface IReduxState {
  communications: {
    categoriesFetching: ICommunication;
  };
  data: IData;
}

type Action =
  { type: 'CATEGORY_SELECT:CATEGORY_SELECTED'; payload: number } |
  { type: 'CATEGORY_SELECT:LOAD_CATEGORIES'; } |
  { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED'; payload: ICategoriesResponse; };

export {
  IData,
  IReduxState,
  ICommunication,
  ICategory,
  Action,
};
