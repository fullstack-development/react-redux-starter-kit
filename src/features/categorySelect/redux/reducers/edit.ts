import { combineReducers } from 'redux';
import { makeEditFieldReducer } from 'shared/helpers/redux';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import initial from '../initial';

const selectedCategoryReducer =
  makeEditFieldReducer<NS.IChooseCategoryAction, NS.IReduxState['edit']['selectedCategoryUid']>(
    'CATEGORY_SELECT:CHOOSE_CATEGORY', initial.edit.selectedCategoryUid,
  );

export default combineReducers({
  selectedCategoryUid: selectedCategoryReducer,
} as ReducersMap<NS.IReduxState['edit']>);
