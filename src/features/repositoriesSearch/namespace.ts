import { IRepository, IRepositoriesSearchResult } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

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
// TODO: think about these types here & in UsersSearch
export interface ISearchRepositoriesPayload extends IRepositoriesSearchFormFields {
  page: number;
}

export interface ISearchRepositoriesSuccessPayload extends IRepositoriesSearchResult {
  page: number;
}

export type IResetSearchResults = IPlainAction<'REPOSITORIES_SEARCH:RESET_SEARCH_RESULTS'>;

export type ISearchRepositories = IAction<'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES', ISearchRepositoriesPayload>;
export type ISearchRepositoriesSuccess = IAction<
  'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_SUCCESS', ISearchRepositoriesSuccessPayload
>;
export type ISearchRepositoriesFail = IPlainFailAction<'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_FAIL'>;

export type IAction = ISearchRepositories | ISearchRepositoriesSuccess | ISearchRepositoriesFail | IResetSearchResults;
