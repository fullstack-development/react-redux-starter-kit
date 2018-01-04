import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'shared/helpers/redux';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import initial from '../initial';

export default combineReducers({
  categoriesFetching: makeCommunicationReducer<
    NS.ILoadCategoriesAction, NS.ILoadCategoriesCompletedAction, NS.ILoadCategoriesFailAction
    >(
    'CATEGORY_SELECT:LOAD_CATEGORIES',
    'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED',
    'CATEGORY_SELECT:LOAD_CATEGORIES_FAIL',
    initial.communications.categoriesFetching,
  ),
} as ReducersMap<NS.IReduxState['communications']>);
