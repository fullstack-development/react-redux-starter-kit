import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';

import * as NS from '../../namespace';
import { initial } from '../initial';

/* eslint max-len: 0 */
export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  searchRepositories: makeCommunicationReducer<NS.ISearchRepositories, NS.ISearchRepositoriesSuccess, NS.ISearchRepositoriesFail>(
    'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES',
    'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_SUCCESS',
    'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_FAIL',
    initial.communication.searchRepositories,
  ),
});
