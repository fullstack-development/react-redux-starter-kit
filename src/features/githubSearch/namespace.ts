import { IUser } from 'shared/types/models';
import { ICommunication, IPlainFailAction, IAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    foundUsers: IUser[];
  };
  communication: {
    searchUser: ICommunication;
  };
}

export type ISearchUser = IAction<'GITHUB_SEARCH:SEARCH_USER', string>;
export type ISearchUserSuccess = IAction<'GITHUB_SEARCH:SEARCH_USER_SUCCESS', any>;
export type ISearchUserFail = IPlainFailAction<'GITHUB_SEARCH:SEARCH_USER_FAIL'>;

export type IAction = ISearchUser | ISearchUserSuccess | ISearchUserFail;
