import { combineReducers } from 'redux';

import { ReducersMap } from 'shared/types/redux';

import dataReducer from './data';
import * as NS from '../../namespace';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
} as ReducersMap<NS.IReduxState>);
