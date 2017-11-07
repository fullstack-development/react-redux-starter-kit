import { expect } from 'chai';
import { sandbox } from 'sinon';
import { put, call, select, take } from 'redux-saga/effects';
import { executeCategoriesLoadingSaga } from '../sagas';
import { asEffect } from 'redux-saga/utils';
import { runGenerator } from 'shared/helpers/test';

describe('(Redux) categorySelect feature', () => {
  describe('(Saga) executeCategoriesLoading', () => {
    const sandboxInstance = sandbox.create();

    // beforeEach(() => {
    //   mockChannel = {
    //     close: sandboxInstance.spy(),
    //     flush: sandboxInstance.spy(),
    //     put: sandboxInstance.spy(),
    //     take: sandboxInstance.spy(),
    //     call: sandboxInstance.spy(),
    //   };
    // });

    const deps = {
      api: {
        loadCategories: sandboxInstance.stub(),
      },
    };

    it('should call api method loadCategories', () => {
      const gen = executeCategoriesLoadingSaga(deps);
      expect(gen.next().value).to.eql(call(deps.api.loadCategories));
    });

    it('should put load categories completed ', () => {
      const gen = executeCategoriesLoadingSaga(deps);
      expect(gen.next().value).to.eql(call(deps.api.loadCategories));
    });
    { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: response }
  });
});
