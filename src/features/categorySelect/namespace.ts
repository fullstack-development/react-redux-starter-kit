import { ICategory } from 'shared/types/models';
import { ICommunicationState } from 'shared/helpers/redux';

interface IData {
  options: ICategory[];
  selected: number | null;
}

interface IReduxState {
  communications: {
    categoriesFetching: ICommunicationState;
  };
  data: IData;
}

type Action =
  { type: 'CATEGORY_SELECT:CATEGORY_SELECTED'; payload: number } |
  { type: 'CATEGORY_SELECT:LOAD_CATEGORIES'; } |
  { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED'; payload: ICategory[]; };

export {
  IData,
  IReduxState,
  ICategory,
  Action,
};
