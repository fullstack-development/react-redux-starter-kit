import { combineReducers } from 'redux';

import { dataReducer } from './data';
import * as NS from '../../namespace';

export const reducer = combineReducers<NS.IReduxState>({
  data: dataReducer,
});
