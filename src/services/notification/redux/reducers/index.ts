import { combineReducers } from 'redux';

import editReducer from './edit';
import * as NS from '../../namespace';

export default combineReducers<NS.IReduxState>({
  edit: editReducer,
});

export { editReducer };
