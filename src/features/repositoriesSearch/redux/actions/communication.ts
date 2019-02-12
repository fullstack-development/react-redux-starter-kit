import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: searchRepositories, completed: searchRepositoriesSuccess, failed: searchRepositoriesFail } =
  makeCommunicationActionCreators<NS.ISearchRepositories, NS.ISearchRepositoriesSuccess, NS.ISearchRepositoriesFail>(
    'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES',
    'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_SUCCESS',
    'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_FAIL',
  );
