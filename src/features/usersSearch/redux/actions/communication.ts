import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: searchUser, completed: searchUserSuccess, failed: searchUserFail } =
  makeCommunicationActionCreators<NS.ISearchUser, NS.ISearchUserSuccess, NS.ISearchUserFail>(
    'USER_SEARCH:SEARCH_USER',
    'USER_SEARCH:SEARCH_USER_SUCCESS',
    'USER_SEARCH:SEARCH_USER_FAIL',
  );

export const { execute: loadUserDetails, completed: loadUserDetailsSuccess, failed: loadUserDetailsFail } =
  makeCommunicationActionCreators<NS.ILoadUserDetails, NS.ILoadUserDetailsSuccess, NS.ILoadUserDetailsFail>(
    'USER_SEARCH:LOAD_USER_DETAILS',
    'USER_SEARCH:LOAD_USER_DETAILS_SUCCESS',
    'USER_SEARCH:LOAD_USER_DETAILS_FAIL',
  );
