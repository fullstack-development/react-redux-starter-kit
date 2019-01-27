import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: searchUser, completed: searchUserSuccess, failed: searchUserFail } =
  makeCommunicationActionCreators<NS.ISearchUser, NS.ISearchUserSuccess, NS.ISearchUserFail>(
    'GITHUB_SEARCH:SEARCH_USER',
    'GITHUB_SEARCH:SEARCH_USER_SUCCESS',
    'GITHUB_SEARCH:SEARCH_USER_FAIL',
  );
