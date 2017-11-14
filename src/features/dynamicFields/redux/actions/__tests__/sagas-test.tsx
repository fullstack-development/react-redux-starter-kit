import { expect } from 'chai';
import { sandbox } from 'sinon';
import { put, call } from 'redux-saga/effects';
import { executeLoadFieldsSaga } from '../sagas';
import { runGenerator } from 'shared/helpers/test';
import { loadFieldsSuccessed } from '../communication';

describe('(Redux) dynamicFields feature', () => {
  describe('(Saga) executeLoadFields', () => {
    const sandboxInstance = sandbox.create();

    const deps = {
      api: {
        loadFields: sandboxInstance.stub(),
      },
    };

    const fields = { fields : {} };
    const action = { type: '', payload: 123 };

    it('should call api method loadFields', () => {
      const gen = executeLoadFieldsSaga(deps as any, action);
      expect(gen.next().value).to.eql(call(deps.api.loadFields, action.payload));
    });

    it('should put load fields completed', () => {
      const gen = executeLoadFieldsSaga(deps as any, action);
      const skippedGen = runGenerator(gen, 1, {});
      expect(skippedGen.next(fields).value).eql(put(loadFieldsSuccessed(fields)));
    });
  });
});
