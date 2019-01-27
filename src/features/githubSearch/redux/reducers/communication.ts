import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import initial from '../initial';

// tslint:disable:max-line-length
export default combineReducers<NS.IReduxState['communication']>({
  searchUser: makeCommunicationReducer<NS.ISearchUser, NS.ISearchUserSuccess, NS.ISearchUserFail>(
    'GITHUB_SEARCH:SEARCH_USER',
    'GITHUB_SEARCH:SEARCH_USER_SUCCESS',
    'GITHUB_SEARCH:SEARCH_USER_FAIL',
    initial.communication.searchUser,
  ),
});
