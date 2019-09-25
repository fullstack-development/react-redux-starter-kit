import { combineReducers } from 'redux';
import editReducer from './edit';
import usersReducer from './users';
import reposReducer from './repos';
import * as NS from '../../namespace';

export default combineReducers<NS.IReduxState>({
  edit: editReducer,
  users: usersReducer,
  repos: reposReducer,
});
