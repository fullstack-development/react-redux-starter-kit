import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: searchUsers, completed: searchUsersSuccess, failed: searchUsersFail } =
  makeCommunicationActionCreators<NS.ISearchUsers, NS.ISearchUsersSuccess, NS.ISearchUsersFail>(
    'USERS_SEARCH:SEARCH_USERS',
    'USERS_SEARCH:SEARCH_USERS_SUCCESS',
    'USERS_SEARCH:SEARCH_USERS_FAIL',
  );

export const { execute: loadUserDetails, completed: loadUserDetailsSuccess, failed: loadUserDetailsFail } =
  makeCommunicationActionCreators<NS.ILoadUserDetails, NS.ILoadUserDetailsSuccess, NS.ILoadUserDetailsFail>(
    'USERS_SEARCH:LOAD_USER_DETAILS',
    'USERS_SEARCH:LOAD_USER_DETAILS_SUCCESS',
    'USERS_SEARCH:LOAD_USER_DETAILS_FAIL',
  );
