import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import { normalizeCities } from '../data/schema';
import { INormalizedCitiesResponse, ILoadCitiesCompletedAction } from '../../namespace';

function getSaga({ api }: IDependencies): () => SagaIterator {
  function* executeLoadCities() {
    try {
      const response = yield call(api.loadCities);
      const data: INormalizedCitiesResponse = normalizeCities(response);
      const action: ILoadCitiesCompletedAction = {
        type: 'LOCATION_SELECT:LOAD_CITIES_COMPLETED',
        payload: data,
      };

      yield put(action);
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
