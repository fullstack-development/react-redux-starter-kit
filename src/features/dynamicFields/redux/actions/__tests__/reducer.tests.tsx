import { expect } from 'chai';
import reducer from '../../reducers';
import initialState from '../../data/initial';

describe('(Redux) dynamicFields feature', () => {
  describe('Reducer tests', () => {

    it('should check state DYNAMIC_FIELDS:LOAD_FIELDS', () => {
      const state = reducer(initialState, { type: 'DYNAMIC_FIELDS:LOAD_FIELDS', payload: 213 });
      expect(state).deep.equal({
        ...initialState,
        communications: {
           fetching: {
             isRequesting: true,
             error: '',
           },
        },
        data: {
           fields: {
             uid: 213,
             values: {},
           },
           values: {},
         },
      });
    });

    it('should check state DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED', () => {
      const state = reducer(
        initialState,
        { type: 'DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED', payload: { uid: 213, values: 1 } },
      );
      expect(state).deep.equal({
        ...initialState,
        data: {
           fields: {
             uid: 213,
             values: 1,
           },
           values: {},
        },
      });
    });

    it('should check state DYNAMIC_FIELDS:LOAD_CATEGORIES_FAILED', () => {
      const state = reducer(
        initialState,
        { type: 'DYNAMIC_FIELDS:LOAD_CATEGORIES_FAILED', payload: 'This is error' },
      );
      expect(state).deep.equal({
        ...initialState,
        communications: {
           fetching: {
             isRequesting: false,
             error: 'This is error',
           },
        },
      });
    });
  });
});
