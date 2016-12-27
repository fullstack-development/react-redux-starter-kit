import { createSelector } from 'reselect';
import Namespace from '../namespace';

function getFeatureState(state: any): Namespace.InitialState {
  return state.locationSelect;
}

function selectSelectedLocation(state: any): Namespace.SelectedLocation {
  const ownState: Namespace.InitialState = getFeatureState(state);
  return ownState.data.selectedLocation;
}

function selectAreaById(state: any, id: number): Namespace.Area {
  const ownState: Namespace.InitialState = getFeatureState(state);
  return ownState.data.entities.areas[id];
}

function selectCityById(state: any, id: number): Namespace.City {
  const ownState: Namespace.InitialState = getFeatureState(state);
  return ownState.data.entities.cities[id];
}

export default {
  selectAreaById,
  selectCityById,
  getFeatureState,
  selectSelectedLocation
};