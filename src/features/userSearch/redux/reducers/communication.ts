import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import initial from '../initial';

// tslint:disable:max-line-length
export default combineReducers<NS.IReduxState['communication']>({
  searchUser: makeCommunicationReducer<NS.ISearchUser, NS.ISearchUserSuccess, NS.ISearchUserFail>(
    'USER_SEARCH:SEARCH_USER',
    'USER_SEARCH:SEARCH_USER_SUCCESS',
    'USER_SEARCH:SEARCH_USER_FAIL',
    initial.communication.searchUser,
  ),
  loadUserDetails: makeCommunicationReducer<NS.ILoadUserDetails, NS.ILoadUserDetailsSuccess, NS.ILoadUserDetailsFail>(
    'USER_SEARCH:LOAD_USER_DETAILS',
    'USER_SEARCH:LOAD_USER_DETAILS_SUCCESS',
    'USER_SEARCH:LOAD_USER_DETAILS_FAIL',
    initial.communication.loadUserDetails,
  ),
});
