import { expect, AssertionError } from 'chai';
import { stub } from 'sinon';
import { loadCategories } from '../communication';
import createMockStore, { IStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import initial from './../../initial';
import { IAction, IReduxState } from 'shared/types/app';
import Api, { ICategoriesResponse } from 'shared/api/Api';

const mockStore = createMockStore<IReduxState>([thunk]);

describe('(Feature) categorySelect', () => {
  describe('(Redux) Actions', () => {
    describe('loadCategories', () => {
      it('should return function with three arguments', () => {
        const action = loadCategories();
        expect(action.length).to.be.equal(3);
      });

      it('should dispatch two actions: LOAD and SUCCESS, if loading is successed', async() => {
        const categories = [
          { name: 'test 1', id: 1 },
          { name: 'test 2', id: 2 },
        ];

        const api = new Api('');
        const fakeLoadCategoriesApi = (): Promise<ICategoriesResponse> => Promise.resolve({ categories });
        const loadCategoriesStub = stub(api, 'loadCategories').callsFake(fakeLoadCategoriesApi);

        const action = loadCategories();
        const store: IStore<IReduxState> = mockStore({ categorySelect: { ...initial } } as IReduxState);
        const expectedActions: IAction[] = [
          { type: 'CATEGORY_SELECT:LOAD_CATEGORIES' },
          { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: { categories } },
        ];

        await action(store.dispatch, store.getState, { api });

        expect(store.getActions()).to.deep.equal(expectedActions);

        loadCategoriesStub.restore();
      });

      it('should dispatch FAILED action, if error occurred', async() => {
        const api = new Api('');
        const fakeLoadCategoriesApi = (): Promise<ICategoriesResponse> => Promise.reject('Error!');
        const loadCategoriesStub = stub(api, 'loadCategories').callsFake(fakeLoadCategoriesApi);

        const action = loadCategories();
        const store: IStore<IReduxState> = mockStore({ categorySelect: { ...initial } } as IReduxState);
        const expectedActions: IAction[] = [
          { type: 'CATEGORY_SELECT:LOAD_CATEGORIES' },
          { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', payload: 'Error!' },
        ];

        try {
          await action(store.dispatch, store.getState, { api });
          throw new AssertionError('Error from action should be thrown, but it was not happen!');
        } catch (err) {
          expect(err).to.be.equal('Error!');
          expect(store.getActions()).to.deep.equal(expectedActions);
        } finally {
          loadCategoriesStub.restore();
        }

      });
    });
  });
});
