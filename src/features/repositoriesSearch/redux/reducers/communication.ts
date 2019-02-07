import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import initial from '../initial';

// tslint:disable:max-line-length
export default combineReducers<NS.IReduxState['communication']>({
  searchRepositories: makeCommunicationReducer<NS.ISearchRepositories, NS.ISearchRepositoriesSuccess, NS.ISearchRepositoriesFail>(
    'REPOSITORY_SEARCH:SEARCH_REPOSITORIES',
    'REPOSITORY_SEARCH:SEARCH_REPOSITORIES_SUCCESS',
    'REPOSITORY_SEARCH:SEARCH_REPOSITORIES_FAIL',
    initial.communication.searchRepositories,
  ),
});
