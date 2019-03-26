import { put, call } from 'redux-saga/effects';

import { SagaIterator } from 'redux-saga';
import { IDependencies } from 'core/types';

import * as actions from '../actions';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield call(() => void 0);
  };
}

export { getSaga };
