import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { ReducersMap } from 'shared/helpers/redux';
import initial from '../initial';

type CategoriesState = NS.IReduxState['data']['categories'];

function loadCategoriesReducer(state: CategoriesState = initial.data.categories, action: NS.Action): CategoriesState {
  switch (action.type) {
    case 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED': {
      return action.payload;
    }
    default: return state;
  }
}

export default combineReducers({
  categories: loadCategoriesReducer,
} as ReducersMap<NS.IReduxState['data']>);
