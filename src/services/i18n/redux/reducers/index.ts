import { combineReducers, Reducer } from 'redux';

import dataReducer from './data';

import * as NS from '../../namespace';

const reducer: Reducer<NS.IReduxState> = combineReducers<NS.IReduxState>({
  data: dataReducer,
});

export default reducer;
