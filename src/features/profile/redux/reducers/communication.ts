import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communication']>({
  loadRepository: makeCommunicationReducer<
    NS.IGetRepository,
    NS.IGetRepositorySuccess,
    NS.IGetRepositoryFail
  >(
    'PROFILE:GET_REPOSITORY',
    'PROFILE:GET_REPOSITORY_SUCCESS',
    'PROFILE:GET_REPOSITORY_FAIL',
    initial.communication.loadRepository,
  ),
});
