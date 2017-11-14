import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import { normalizeCities } from '../data/schema';
import { INormalizedCitiesResponse } from '../../namespace';

function* executeLoadCitiesSaga({ api }: IDependencies) {
  try {
    const response = yield call(api.loadCities);
    const data: INormalizedCitiesResponse = normalizeCities(response);
    yield put({ type: 'LOCATION_SELECT:LOAD_CITIES_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'LOCATION_SELECT:LOAD_CITIES_FAIL', payload: error });
  }
}

function getSaga(deps: IDependencies): () => SagaIterator {

  function* executeLoadCities() {
    yield executeLoadCitiesSaga(deps);
  }

  function* saga(): SagaIterator {
    yield [
      takeLatest('LOCATION_SELECT:LOAD_CITIES', executeLoadCities),
    ];
  }

  return saga;
}

export { executeLoadCitiesSaga };
export default getSaga;
