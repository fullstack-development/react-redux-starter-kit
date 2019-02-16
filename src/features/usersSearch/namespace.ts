import { IGithubUser, IDetailedGithubUser } from 'shared/types/models';
import { IUsersSearchResults, IUsersSearchFilters, IPaginatedSearchRequest } from 'shared/types/githubSearch';
import { IPaginationState } from 'shared/types/common';
import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    foundUsers: IGithubUser[];
    userDetails: IDetailedGithubUser | null;
  };
  communication: {
    searchUser: ICommunication;
    loadUserDetails: ICommunication;
  };
  ui: {
    usersSearchPaginationState: IPaginationState;
  };
}

export interface IUsersSearchFormFields extends IUsersSearchFilters {
  searchString: string;
}

export type ISearchUserPayload = IPaginatedSearchRequest<IUsersSearchFormFields>;

export interface ISearchUserSuccessPayload extends IUsersSearchResults {
  page: number;
}

export type IResetUserDetails = IPlainAction<'USER_SEARCH:RESET_USER_DETAILS'>;
export type IResetSearchResults = IPlainAction<'USER_SEARCH:RESET_SEARCH_RESULTS'>;

export type ISearchUser = IAction<'USER_SEARCH:SEARCH_USER', ISearchUserPayload>;
export type ISearchUserSuccess = IAction<'USER_SEARCH:SEARCH_USER_SUCCESS', ISearchUserSuccessPayload>;
export type ISearchUserFail = IPlainFailAction<'USER_SEARCH:SEARCH_USER_FAIL'>;

export type ILoadUserDetails = IAction<'USER_SEARCH:LOAD_USER_DETAILS', string>;
export type ILoadUserDetailsSuccess = IAction<'USER_SEARCH:LOAD_USER_DETAILS_SUCCESS', IDetailedGithubUser>;
export type ILoadUserDetailsFail = IPlainFailAction<'USER_SEARCH:LOAD_USER_DETAILS_FAIL'>;

export type IAction = IResetUserDetails | IResetSearchResults | ISearchUser | ISearchUserSuccess | ISearchUserFail
| ILoadUserDetails | ILoadUserDetailsFail | ILoadUserDetailsSuccess;
