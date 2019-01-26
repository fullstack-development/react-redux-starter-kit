import { combineReducers } from 'redux';

// import { ReducersMap } from 'shared/types/redux';

import communicationReducer from './communication';
import dataReducer from './data';
import * as NS from '../../namespace';

export default combineReducers<NS.IReduxState>({
  communication: communicationReducer,
  data: dataReducer,
}/* as ReducersMap<NS.IReduxState>*/);
