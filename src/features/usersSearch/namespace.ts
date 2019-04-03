import { IGithubUser, IDetailedGithubUser } from 'shared/types/models';
import { IUsersSearchResults, IUsersSearchFilters, IPaginatedSearchRequest } from 'shared/types/githubSearch';
import { IPaginationState } from 'shared/types/common';
import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    foundUsers: IGithubUser[];
    userDetails: IDetailedGithubUser | null;
    totalResults: number;
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

export type ISearchUsersPayload = IPaginatedSearchRequest<IUsersSearchFormFields>;

export interface ISearchUsersSuccessPayload extends IUsersSearchResults {
  page: number;
}

export type IResetUserDetails = IPlainAction<'USERS_SEARCH:RESET_USER_DETAILS'>;
export type IResetSearchResults = IPlainAction<'USERS_SEARCH:RESET_SEARCH_RESULTS'>;

export type ISearchUsers = IAction<'USERS_SEARCH:SEARCH_USERS', ISearchUsersPayload>;
export type ISearchUsersSuccess = IAction<'USERS_SEARCH:SEARCH_USERS_SUCCESS', ISearchUsersSuccessPayload>;
export type ISearchUsersFail = IPlainFailAction<'USERS_SEARCH:SEARCH_USERS_FAIL'>;

export type ILoadUserDetails = IAction<'USERS_SEARCH:LOAD_USER_DETAILS', string>;
export type ILoadUserDetailsSuccess = IAction<'USERS_SEARCH:LOAD_USER_DETAILS_SUCCESS', IDetailedGithubUser>;
export type ILoadUserDetailsFail = IPlainFailAction<'USERS_SEARCH:LOAD_USER_DETAILS_FAIL'>;

export type IAction = IResetUserDetails | IResetSearchResults | ISearchUsers | ISearchUsersSuccess | ISearchUsersFail
| ILoadUserDetails | ILoadUserDetailsFail | ILoadUserDetailsSuccess;
