import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';
import getErrorMsg from 'shared/helpers/getErrorMsg';

import { INormalizedCities } from 'shared/types/models';
import { IDependencies } from 'shared/types/app';
import { ILoadCities } from '../../namespace';

import * as actions from '../actions';

const loadCitiesType: ILoadCities['type'] = 'LOCATION_SELECT:LOAD_CITIES';

function getSaga(deps: IDependencies): () => SagaIterator {
  return function* saga(): SagaIterator {
    yield [
      takeLatest(loadCitiesType, executeLoadCities, deps),
    ];
  };
}

function* executeLoadCities({ api }: IDependencies) {
  try {
    const data: INormalizedCities = yield call(api.loadCities);
    yield put(actions.loadCitiesSuccess(data));
  } catch (error) {
    yield put(actions.loadCitiesFail(getErrorMsg(error)));
  }
}

export default getSaga;
