import { expect } from 'chai';
import { sandbox } from 'sinon';
import { put, call } from 'redux-saga/effects';
import { executeCategoriesLoadingSaga } from '../sagas';
import { runGenerator } from 'shared/helpers/test';
import { ICategoriesResponse } from 'shared/api/Api';

describe('(Redux) categorySelect feature', () => {
  describe('(Saga) executeCategoriesLoading', () => {
    const sandboxInstance = sandbox.create();

    const deps = {
      api: {
        loadCategories: sandboxInstance.stub(),
      },
    };

    const categories: ICategoriesResponse = {
      categories : [
        { id: 1, name: 'Transport' },
        { id: 2, name: 'Three Wheel' },
        { id: 3, name: 'Other Vehicles' },
        { id: 4, name: 'Rent car' },
      ],
    };

    it('should call api method loadCategories', () => {
      const gen = executeCategoriesLoadingSaga(deps as any);
      expect(gen.next().value).to.eql(call(deps.api.loadCategories));
    });

    it('should put load categories completed', () => {
      const gen = executeCategoriesLoadingSaga(deps as any);
      const skippedGen = runGenerator(gen, 1, {});
      expect(skippedGen.next(categories).value)
      .eql(put({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: categories }));
    });
  });
});
