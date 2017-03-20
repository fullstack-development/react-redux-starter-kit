import { takeLatest, Saga } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import { normalizeCities } from '../data/schema';
import { INormalizedCitiesResponse } from '../../namespace';

function getSaga({ api }: IDependencies): Saga {

  function* watchLoadCities() {
    yield takeLatest('LOCATION_SELECT:LOAD_CITIES', executeLoadCities);
  }

  function* executeLoadCities() {
    try {
      const response = yield call(api.loadCities);
      const data: INormalizedCitiesResponse = normalizeCities(response);

      yield put({ type: 'LOCATION_SELECT:LOAD_CITIES_SUCCESS', payload: data });
    } catch (error) {
      yield put({ type: 'LOCATION_SELECT:LOAD_CITIES_FAIL', payload: error });
    }
  }

  function* saga() {
    yield [watchLoadCities()];
  }

  return saga;
}

export default getSaga;
