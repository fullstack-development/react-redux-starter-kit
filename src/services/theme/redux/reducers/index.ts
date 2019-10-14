import { combineReducers } from 'redux';

import dataReducer from './data';
import * as NS from '../../namespace';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
});
