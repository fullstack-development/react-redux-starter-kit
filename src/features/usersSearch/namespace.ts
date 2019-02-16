import { IUser, IDetailedUser, IUsersSearchResults } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { IUsersSearchOptions } from 'shared/types/github';
import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    foundUsers: IUser[];
    userDetails: IDetailedUser | null;
  };
  communication: {
    searchUser: ICommunication;
    loadUserDetails: ICommunication;
  };
  ui: {
    usersSearchPaginationState: IPaginationState;
  };
}

export interface IUsersSearchFormFields extends IUsersSearchOptions {
  searchString: string;
}

export interface ISearchUserPayload extends IUsersSearchFormFields {
  page: number;
}

export interface ISearchUserSuccessPayload extends IUsersSearchResults {
  page: number;
}

export type IResetUserDetails = IPlainAction<'USER_SEARCH:RESET_USER_DETAILS'>;
export type IResetSearchResults = IPlainAction<'USER_SEARCH:RESET_SEARCH_RESULTS'>;

export type ISearchUser = IAction<'USER_SEARCH:SEARCH_USER', ISearchUserPayload>;
export type ISearchUserSuccess = IAction<'USER_SEARCH:SEARCH_USER_SUCCESS', ISearchUserSuccessPayload>;
export type ISearchUserFail = IPlainFailAction<'USER_SEARCH:SEARCH_USER_FAIL'>;

export type ILoadUserDetails = IAction<'USER_SEARCH:LOAD_USER_DETAILS', string>;
export type ILoadUserDetailsSuccess = IAction<'USER_SEARCH:LOAD_USER_DETAILS_SUCCESS', IDetailedUser>;
export type ILoadUserDetailsFail = IPlainFailAction<'USER_SEARCH:LOAD_USER_DETAILS_FAIL'>;

export type IAction = IResetUserDetails | IResetSearchResults | ISearchUser | ISearchUserSuccess | ISearchUserFail
| ILoadUserDetails | ILoadUserDetailsFail | ILoadUserDetailsSuccess;
