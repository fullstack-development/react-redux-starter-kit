import { expect } from 'chai';
import { data } from './fixtures';
import reducer from '../../reducers';
import initialState from '../../data/initial';
import { IReduxState } from '../../../namespace';

describe('(Redux) locationSeleect feature', () => {
  describe('Reducer tests', () => {

    const mockState: IReduxState = {
      ...initialState,
      data: {
        ...initialState.data,
        entities: {
          areas: { 1: { id: 1, displayName: 'displayName', city: 1, name: 'name', point: { lat: 1, lng: 1 } } },
          cities: { 1: { id: 1, name: 'Astana', areas: [1, 2] } },
        },
      },
    };

    it('should check state LOCATION_SELECT:LOAD_CITIES_SUCCESS', () => {
      const state = reducer(
        initialState,
        { type: 'LOCATION_SELECT:LOAD_CITIES_SUCCESS', payload: data },
      );
      expect(state).deep.equal({
        ...initialState,
        data: {
          ...initialState.data,
          entities: data.entities,
          citiesSet: data.result,
        },
      });
    });

    it('should check state LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID without location', () => {
      const state = reducer(
        initialState,
        { type: 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID', payload: { showOnMap: true } },
      );
      expect(state).deep.equal({
        ...initialState,
        data: {
          ...initialState.data,
          selectedLocation: null,
        },
        ui: {
          ...initialState.ui,
          showSelectedLocation: true,
        },
      });
    });

    it('should check state LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID without location', () => {
      const state = reducer(
        mockState,
        { type: 'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID',
          payload: {
            location: { areaId: 1, point: { lat: 1, lng: 1 } },
            showOnMap: true,
          },
        },
      );
      expect(state).deep.equal({
        ...mockState,
        data: {
          ...mockState.data,
          selectedLocation: { point: { lat: 1, lng: 1 }, city: 1, area: 1 },
        },
        ui: {
          ...mockState.ui,
          showSelectedLocation: true,
        },
      });
    });
  });
});
