import { IUser, IUserDetails } from 'shared/types/models';
import { ICommunication, IPlainFailAction, IAction } from 'shared/types/redux';
import { IUserSearchOptions } from 'shared/types/github';

export interface IReduxState {
  data: {
    foundUsers: IUser[];
    userDetails: null | IUserDetails;
  };
  communication: {
    searchUser: ICommunication;
    loadUserDetails: ICommunication;
  };
}

export interface IFormFields extends IUserSearchOptions {
  search: string;
}

export interface ISearchUserPayload {
  queryText: string;
  options: IUserSearchOptions;
}

export type ISearchUser = IAction<'GITHUB_SEARCH:SEARCH_USER', ISearchUserPayload>;
export type ISearchUserSuccess = IAction<'GITHUB_SEARCH:SEARCH_USER_SUCCESS', IUser[]>;
export type ISearchUserFail = IPlainFailAction<'GITHUB_SEARCH:SEARCH_USER_FAIL'>;

export type ILoadUserDetails = IAction<'GITHUB_SEARCH:LOAD_USER_DETAILS', string>;
export type ILoadUserDetailsSuccess = IAction<'GITHUB_SEARCH:LOAD_USER_DETAILS_SUCCESS', IUserDetails>;
export type ILoadUserDetailsFail = IPlainFailAction<'GITHUB_SEARCH:LOAD_USER_DETAILS_FAIL'>;

export type IAction = ISearchUser | ISearchUserSuccess | ISearchUserFail | ILoadUserDetails
| ILoadUserDetailsFail | ILoadUserDetailsSuccess;
