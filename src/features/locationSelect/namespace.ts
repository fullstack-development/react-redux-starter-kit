import {
  IArea, ICity, IAreaEntities, ICityEntities, INormalizedLocation, INormalizedCities, INormalizedArea,
} from 'shared/types/models';
import { ICommunication, IPlainAction, IAction, IPlainFailAction } from 'shared/types/redux';

export interface IAreaEntities { [key: number]: IArea; }
export interface ICityEntities { [key: number]: ICity; }

export interface IReduxState {
  communications: {
    citiesFetching: ICommunication;
  };
  data: {
    entities: {
      areas: IAreaEntities;
      cities: ICityEntities;
    },
    citiesSet: number[],
    selectedLocation: INormalizedLocation | null;
  };
  ui: {
    showSelectedLocation: boolean;
  };
}

export type ILoadCities = IPlainAction<'LOCATION_SELECT:LOAD_CITIES'>;
export type ILoadCitiesSuccess = IAction<'LOCATION_SELECT:LOAD_CITIES_SUCCESS', INormalizedCities>;
export type ILoadCitiesFail = IPlainFailAction<'LOCATION_SELECT:LOAD_CITIES_FAIL'>;

export type ISelectLocationByAreaID
  = IAction<'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID', ISelectLocationByAreaIDActionPayload>;

export interface ISelectLocationByAreaIDActionPayload {
  location?: INormalizedArea;
  showOnMap: boolean;
}

export type Action =
  | ILoadCities | ILoadCitiesSuccess | ILoadCitiesFail | ISelectLocationByAreaID;
