import { expect } from 'chai';
import { sandbox } from 'sinon';
import { put, call, select } from 'redux-saga/effects';
import { saveFieldsSaga } from '../sagas';
import { saveFieldsFail } from '../actions/communication';
import { runGenerator } from 'shared/helpers/test';
import { data, selectedLocation, state } from './fixtures';

describe('(Redux) OrderForm module', () => {
  describe('(Saga) saveFieldsSaga', () => {
    const sandboxInstance = sandbox.create();

    const deps = {
      api: {
        saveFields: sandboxInstance.stub(),
      },
    };

    it('should select state', () => {
      const gen = saveFieldsSaga(deps as any);
      expect(gen.next().value).to.eql(select());
    });

    it('should put completed fail action if not location', () => {
      const gen = saveFieldsSaga(deps as any);
      const skippedGen = runGenerator(gen, 1, { 1: state });
      expect(skippedGen.next(state).value).eql(put(saveFieldsFail('Location is not set')));
    });

    it('should call saveFields', () => {
      const gen = saveFieldsSaga(deps as any);
      const newState = { ...state, locationSelect: { data: { selectedLocation } } };
      const skippedGen = runGenerator(gen, 1, { 1: newState });
      expect(skippedGen.next(newState).value).eql(call(deps.api.saveFields, data));
    });

  });
});
