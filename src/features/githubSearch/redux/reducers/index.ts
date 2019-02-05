import { combineReducers } from 'redux';
import communicationReducer from './communication';
import dataReducer from './data';
import * as NS from '../../namespace';

export default combineReducers<NS.IReduxState>({
  communication: communicationReducer,
  data: dataReducer,
});
