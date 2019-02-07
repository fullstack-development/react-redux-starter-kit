import { IRepository } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { ICommunication, IPlainFailAction, IAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    foundRepositories: IRepository[] | null;
  };
  communication: {
    searchRepositories: ICommunication;
  };
  ui: {
    repositoriesSearchPaginationState: IPaginationState | null;
  };
}

export interface IRepositoriesSearchFormFields {
  searchString: string;
}

export type ISearchRepositories = IAction<'REPOSITORY_SEARCH:SEARCH_REPOSITORIES', string>;
export type ISearchRepositoriesSuccess = IAction<'REPOSITORY_SEARCH:SEARCH_REPOSITORIES_SUCCESS', IRepository[]>;
export type ISearchRepositoriesFail = IPlainFailAction<'REPOSITORY_SEARCH:SEARCH_REPOSITORIES_FAIL'>;

export type IAction = ISearchRepositories | ISearchRepositoriesSuccess | ISearchRepositoriesFail;
