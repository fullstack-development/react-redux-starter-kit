import { IArea, ICity, INormalizedLocation } from 'shared/types/models';
import { IReduxState } from '../../namespace';

export function getFeatureState(state: any): IReduxState {
  return state.locationSelect;
}

export function selectSelectedLocation(state: any): INormalizedLocation | null {
  const ownState: IReduxState = getFeatureState(state);
  return ownState.data.selectedLocation;
}

export function selectAreaById(state: any, id: number): IArea {
  const ownState: IReduxState = getFeatureState(state);
  return ownState.data.entities.areas[id];
}

export function selectCityById(state: any, id: number): ICity {
  const ownState: IReduxState = getFeatureState(state);
  return ownState.data.entities.cities[id];
}
