import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import initial from '../initial';

// tslint:disable:max-line-length
export default combineReducers<NS.IReduxState['communication']>({
  searchUser: makeCommunicationReducer<NS.ISearchUsers, NS.ISearchUsersSuccess, NS.ISearchUsersFail>(
    'USERS_SEARCH:SEARCH_USERS',
    'USERS_SEARCH:SEARCH_USERS_SUCCESS',
    'USERS_SEARCH:SEARCH_USERS_FAIL',
    initial.communication.searchUser,
  ),
  loadUserDetails: makeCommunicationReducer<NS.ILoadUserDetails, NS.ILoadUserDetailsSuccess, NS.ILoadUserDetailsFail>(
    'USERS_SEARCH:LOAD_USER_DETAILS',
    'USERS_SEARCH:LOAD_USER_DETAILS_SUCCESS',
    'USERS_SEARCH:LOAD_USER_DETAILS_FAIL',
    initial.communication.loadUserDetails,
  ),
});
