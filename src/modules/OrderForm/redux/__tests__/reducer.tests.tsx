import { expect } from 'chai';
import reducer from '../reducers';
import initialState from '../initial';

describe('(Redux) OrderForm module', () => {
  describe('Reducer tests', () => {

    it('should check state HOME_MODULE:SAVE_FIELDS', () => {
      const state = reducer(
        initialState,
        { type: 'HOME_MODULE:SAVE_FIELDS' },
      );
      expect(state).deep.equal({
        ...initialState,
        communications: {
          ...initialState.communications,
          saving: {
            ...initialState.communications.saving,
            isRequesting: true,
          },
        },
      });
    });

    it('should check state HOME_MODULE:SAVE_FIELDS_SUCCESS', () => {
      const state = reducer(
        initialState,
        { type: 'HOME_MODULE:SAVE_FIELDS_SUCCESS', payload: { mock: true } },
      );
      expect(state).deep.equal({
        ...initialState,
        data: { mock: true },
      });
    });

    it('should check state HOME_MODULE:SAVE_FIELDS_FAIL', () => {
      const state = reducer(
        initialState,
        { type: 'HOME_MODULE:SAVE_FIELDS_FAIL', payload: 'error' },
      );
      expect(state).deep.equal({
        ...initialState,
        communications: {
          ...initialState.communications,
          saving: {
            ...initialState.communications.saving,
            error: 'error',
          },
        },
      });
    });
  });
});
