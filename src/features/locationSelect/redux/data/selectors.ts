import { IReduxState, ILocationCode, IArea, ICity } from '../../namespace';

function getFeatureState(state: any): IReduxState {
  return state.locationSelect;
}

function selectSelectedLocation(state: any): ILocationCode | undefined {
  const ownState: IReduxState = getFeatureState(state);
  return ownState.data.selectedLocation;
}

function selectAreaById(state: any, id: number): IArea {
  const ownState: IReduxState = getFeatureState(state);
  return ownState.data.entities.areas[id];
}

function selectCityById(state: any, id: number): ICity {
  const ownState: IReduxState = getFeatureState(state);
  return ownState.data.entities.cities[id];
}

export default {
  selectAreaById,
  selectCityById,
  getFeatureState,
  selectSelectedLocation,
};
