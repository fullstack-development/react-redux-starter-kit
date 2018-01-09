import { combineReducers } from 'redux';

import dataReducer from './data';
import editReducer from './edit';
import communicationReducer from './communication';

import * as NS from '../../namespace';

const reducer = combineReducers<NS.IReduxState>({
  data: dataReducer,
  edit: editReducer,
  communications: communicationReducer,
});

export default reducer;
