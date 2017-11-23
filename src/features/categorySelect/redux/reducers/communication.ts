import { makeCommunicationReducer, ReducersMap } from 'shared/helpers/redux';
import { combineReducers } from 'redux';
import initial from '../initial';
import * as NS from '../../namespace';

export default combineReducers({
  categoriesFetching: makeCommunicationReducer<NS.ILoadCategories, NS.ILoadCategoriesSuccess, NS.ILoadCategoriesFail>(
    'CATEGORY_SELECT:LOAD_CATEGORIES',
    'CATEGORY_SELECT:LOAD_CATEGORIES_SUCCESS',
    'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL',
    initial.communications.categoriesFetching,
  ),
} as ReducersMap<NS.IReduxState['communications']>);
