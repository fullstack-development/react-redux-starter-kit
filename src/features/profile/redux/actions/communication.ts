import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const {
  execute: getRepository,
  completed: getRepositorySuccess,
  failed: getRepositoryFail,
} = makeCommunicationActionCreators<
  NS.IGetRepository,
  NS.IGetRepositorySuccess,
  NS.IGetRepositoryFail
>(
  'PROFILE:GET_REPOSITORY',
  'PROFILE:GET_REPOSITORY_SUCCESS',
  'PROFILE:GET_REPOSITORY_FAIL',
);
