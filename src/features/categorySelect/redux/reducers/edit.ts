import { combineReducers } from 'redux';
import { makeEditFieldReducer, ReducersMap } from 'shared/helpers/redux';
import initial from '../initial';
import * as NS from '../../namespace';

const selectedCategoryReducer =
  makeEditFieldReducer<NS.IChooseCategoryAction, NS.IReduxState['edit']['selectedCategoryUid']>(
    'CATEGORY_SELECT:CHOOSE_CATEGORY', initial.edit.selectedCategoryUid,
  );

export default combineReducers({
  selectedCategoryUid: selectedCategoryReducer,
} as ReducersMap<NS.IReduxState['edit']>);
