import { expect } from 'chai';
import { mainReducer as dataReducer, getCommunicationReducer } from '../../reducers';
import { initialCommunicationState, initialDataState } from '../../data/initial';

describe('(Redux) categorySelect feature', () => {
  describe('Reducer tests', () => {

    it('should check state CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', () => {
      const categories = {
        categories: [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }],
      };
      const dataState = dataReducer(
        initialDataState,
        { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: categories },
      );
      expect(dataState).deep.equal({ ...initialDataState, options: categories });
    });

    it('should check state CATEGORY_SELECT:CATEGORY_SELECTED', () => {
      const dataState = dataReducer(
        initialDataState,
        { type: 'CATEGORY_SELECT:CATEGORY_SELECTED', payload: 12 },
      );
      expect(dataState).deep.equal({ ...initialDataState, selected: 12 });
    });

    it('should check communication state CATEGORY_SELECT:LOAD_CATEGORIES', () => {
      const comReducer = getCommunicationReducer('LOAD_CATEGORIES');
      const comState = comReducer(
        initialCommunicationState,
        { type: 'CATEGORY_SELECT:LOAD_CATEGORIES'},
      );
      expect(comState).deep.equal({ ...initialCommunicationState, isRequesting: true });
    });

    it('should check communication state CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', () => {
      const comReducer = getCommunicationReducer('LOAD_CATEGORIES');
      const comState = comReducer(
        initialCommunicationState,
        { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED'},
      );
      expect(comState).deep.equal({ ...initialCommunicationState, isRequesting: false });
    });

    it('should check communication state CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', () => {
      const comReducer = getCommunicationReducer('LOAD_CATEGORIES');
      const comState = comReducer(
        initialCommunicationState,
        { type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', payload: 'error' },
      );
      expect(comState).deep.equal({ ...initialCommunicationState, isRequesting: false, error: 'error' });
    });
  });
});
