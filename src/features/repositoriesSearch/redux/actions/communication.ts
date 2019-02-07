import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: searchRepositories, completed: searchRepositoriesSuccess, failed: searchRepositoriesFail } =
  makeCommunicationActionCreators<NS.ISearchRepositories, NS.ISearchRepositoriesSuccess, NS.ISearchRepositoriesFail>(
    'REPOSITORY_SEARCH:SEARCH_REPOSITORIES',
    'REPOSITORY_SEARCH:SEARCH_REPOSITORIES_SUCCESS',
    'REPOSITORY_SEARCH:SEARCH_REPOSITORIES_FAIL',
  );
