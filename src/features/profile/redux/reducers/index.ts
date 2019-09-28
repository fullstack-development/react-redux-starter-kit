import { combineReducers } from 'redux';
import edit from './edit';
import users from './users';
import repos from './repos';
import communication from './communication';
import data from './data';

import * as NS from '../../namespace';

export default combineReducers<NS.IReduxState>({
  edit,
  users,
  repos,
  communication,
  data,
});
