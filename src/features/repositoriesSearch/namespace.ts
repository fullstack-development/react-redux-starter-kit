import { IRepository } from 'shared/types/models';
import {
  IRepositoriesSearchFilters, IRepositoriesSearchResults, IPaginatedSearchRequest,
} from 'shared/types/githubSearch';
import { IPaginationState } from 'shared/types/common';
import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    foundRepositories: IRepository[];
    totalResults: number;
  };
  communication: {
    searchRepositories: ICommunication;
  };
  ui: {
    repositoriesSearchPaginationState: IPaginationState;
  };
}

export interface IRepositoriesSearchFormFields extends IRepositoriesSearchFilters {
  searchString: string;
}

export type ISearchRepositoriesPayload = IPaginatedSearchRequest<IRepositoriesSearchFormFields>;
export interface ISearchRepositoriesSuccessPayload extends IRepositoriesSearchResults {
  page: number;
}

export type IResetSearchResults = IPlainAction<'REPOSITORIES_SEARCH:RESET_SEARCH_RESULTS'>;

export type ISearchRepositories = IAction<'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES', ISearchRepositoriesPayload>;
export type ISearchRepositoriesSuccess = IAction<
  'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_SUCCESS', ISearchRepositoriesSuccessPayload
>;
export type ISearchRepositoriesFail = IPlainFailAction<'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_FAIL'>;

export type IAction = ISearchRepositories | ISearchRepositoriesSuccess | ISearchRepositoriesFail | IResetSearchResults;
