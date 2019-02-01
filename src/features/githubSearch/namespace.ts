import { IUser } from 'shared/types/models';
import { ICommunication, IPlainFailAction, IAction } from 'shared/types/redux';
import { IUserSearchOptions } from 'shared/types/github';

export interface IReduxState {
  data: {
    foundUsers: IUser[];
  };
  communication: {
    searchUser: ICommunication;
  };
}

export interface IFormFields {
  search: string;
  searchBy: IUserSearchOptions['searchBy'];
  searchType: IUserSearchOptions['searchType'];
  minRepos?: number;
  maxRepos?: number;
}

export interface ISearchUserPayload {
  queryText: string;
  options: IUserSearchOptions;
}

export type ISearchUser = IAction<'GITHUB_SEARCH:SEARCH_USER', ISearchUserPayload>;
export type ISearchUserSuccess = IAction<'GITHUB_SEARCH:SEARCH_USER_SUCCESS', any>; // TODO ???
export type ISearchUserFail = IPlainFailAction<'GITHUB_SEARCH:SEARCH_USER_FAIL'>;

export type IAction = ISearchUser | ISearchUserSuccess | ISearchUserFail;
