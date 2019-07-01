import { combineReducers } from 'redux';

import { ReducersMap } from 'shared/helpers/redux';

import * as NS from '../../namespace';
import { dataReducer } from './data';

const reducer = combineReducers<NS.IReduxState>({
  data: dataReducer,
} as ReducersMap<NS.IReduxState>);

export default reducer;
