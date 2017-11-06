import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';

import { INormalizedCities } from 'shared/types/models';
import { IDependencies } from 'shared/types/app';

function getSaga({ api }: IDependencies): () => SagaIterator {
  function* executeLoadCities() {
    try {
      const data: INormalizedCities = yield call(api.loadCities);

      yield put({ type: 'LOCATION_SELECT:LOAD_CITIES_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'LOCATION_SELECT:LOAD_CITIES_FAIL', payload: error });
    }
  }

  function* saga(): SagaIterator {
    yield [
      takeLatest('LOCATION_SELECT:LOAD_CITIES', executeLoadCities),
    ];
  }

  return saga;
}

export default getSaga;
