import { expect } from 'chai';
import { sandbox } from 'sinon';
import { put, call } from 'redux-saga/effects';
import { executeLoadCitiesSaga } from '../sagas';
import { runGenerator } from 'shared/helpers/test';
import { citiesData } from './fixtures';
import { normalizeCities } from '../../data/schema';

describe('(Redux) locationSelect feature', () => {
  describe('(Saga) executeLoadCitiesSaga', () => {
    const sandboxInstance = sandbox.create();

    const deps = {
      api: {
        loadCities: sandboxInstance.stub(),
      },
    };

    it('should call api method loadCities', () => {
      const gen = executeLoadCitiesSaga(deps as any);
      expect(gen.next().value).to.eql(call(deps.api.loadCities));
    });

    it('should put load cities completed', () => {
      const gen = executeLoadCitiesSaga(deps as any);
      const skippedGen = runGenerator(gen, 1, {});
      expect(skippedGen.next(citiesData).value)
      .eql(put({ type: 'LOCATION_SELECT:LOAD_CITIES_SUCCESS', payload: normalizeCities(citiesData) }));
    });
  });
});
