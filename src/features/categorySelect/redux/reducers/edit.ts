import { combineReducers } from 'redux';
import { makeEditFieldReducer } from 'shared/helpers/redux';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import initial from '../initial';

export default combineReducers({
  selectedCategoryUid: makeEditFieldReducer<NS.IChooseCategory, NS.IReduxState['edit']['selectedCategoryUid']>(
    'CATEGORY_SELECT:CHOOSE_CATEGORY', initial.edit.selectedCategoryUid,
  ),
} as ReducersMap<NS.IReduxState['edit']>);
