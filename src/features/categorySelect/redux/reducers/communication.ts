import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import initial from '../initial';

export default combineReducers({
  categoriesFetching: makeCommunicationReducer<NS.ILoadCategories, NS.ILoadCategoriesSuccess, NS.ILoadCategoriesFail>(
    'CATEGORY_SELECT:LOAD_CATEGORIES',
    'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED',
    'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL',
    initial.communications.categoriesFetching,
  ),
} as ReducersMap<NS.IReduxState['communications']>);
