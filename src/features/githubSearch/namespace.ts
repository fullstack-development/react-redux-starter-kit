import { IUser, IDetailedUser } from 'shared/types/models';
import { IUserSearchOptions } from 'shared/types/github';
import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    foundUsers: IUser[];
    userDetails: null | IDetailedUser;
  };
  communication: {
    searchUser: ICommunication;
    loadUserDetails: ICommunication;
  };
}

export interface IUserSearchFormFields extends IUserSearchOptions {
  searchString: string;
}

export type IResetUserDetails = IPlainAction<'GITHUB_SEARCH:RESET_USER_DETAILS'>;

export type ISearchUser = IAction<'GITHUB_SEARCH:SEARCH_USER', IUserSearchFormFields>;
export type ISearchUserSuccess = IAction<'GITHUB_SEARCH:SEARCH_USER_SUCCESS', IUser[]>;
export type ISearchUserFail = IPlainFailAction<'GITHUB_SEARCH:SEARCH_USER_FAIL'>;

export type ILoadUserDetails = IAction<'GITHUB_SEARCH:LOAD_USER_DETAILS', string>;
export type ILoadUserDetailsSuccess = IAction<'GITHUB_SEARCH:LOAD_USER_DETAILS_SUCCESS', IDetailedUser>;
export type ILoadUserDetailsFail = IPlainFailAction<'GITHUB_SEARCH:LOAD_USER_DETAILS_FAIL'>;

export type IAction = IResetUserDetails | ISearchUser | ISearchUserSuccess | ISearchUserFail | ILoadUserDetails
| ILoadUserDetailsFail | ILoadUserDetailsSuccess;
