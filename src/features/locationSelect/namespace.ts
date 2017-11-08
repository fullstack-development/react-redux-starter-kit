import { IPlainAction, IAction } from 'shared/types/app';

export interface ICommunication {
  isRequesting: boolean;
  error: string;
}

export interface IAreaResponse {
  city: number;
  display_name: string;
  name: string;
  point: string;
}

export interface ICityResponse {
  areas: IAreaResponse[];
  name: string;
  id: number;
}

export interface IPoint {
  lat: number;
  lng: number;
}

export interface IArea {
  displayName: string;
  name: string;
  city: number;
  point: IPoint;
  id: number;
}

export interface ICity {
  areas: number[];
  name: string;
  id: number;
}

export interface INormalizedCitiesResponse {
  result: number[];
  entities: {
    cities: IAreaEntities;
    areas: ICityEntities;
  };
}

export interface ILocation {
  city: ICity;
  area: IArea;
  point: IPoint;
}

export interface ILocationCode {
  city: number;
  area: number;
  point: IPoint;
}

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
    selectedLocation?: ILocationCode;
  };
  ui: {
    showSelectedLocation: boolean;
  };
}

export type ILoadCitiesAction = IPlainAction<'LOCATION_SELECT:LOAD_CITIES'>;
export type ILoadCitiesCompletedAction = IAction<'LOCATION_SELECT:LOAD_CITIES_COMPLETED', INormalizedCitiesResponse>;
export type ILoadCitiesFailedAction = IPlainAction<'LOCATION_SELECT:LOAD_CITIES_FAILED'>;

export type ISelectLocationByAreaIDAction
  = IAction<'LOCATION_SELECT:SELECT_LOCATION_BY_AREA_ID', ISelectLocationByAreaIDActionPayload>;

export interface ISelectLocationByAreaIDActionPayload {
  location?: IAreaCode;
  showOnMap: boolean;
}
export interface IAreaCode {
  areaID: number;
  point?: IPoint;
}

export type LocationSelectAction =
  | ILoadCitiesAction
  | ILoadCitiesCompletedAction
  | ILoadCitiesFailedAction
  | ISelectLocationByAreaIDAction;
