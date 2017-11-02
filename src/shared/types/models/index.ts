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

export interface ILocationProperties {
  [key: string]: { lat: number; lng: number; };
  from: { lat: number; lng: number; };
  to: { lat: number; lng: number; };
}

export interface IAreaEntities { [key: number]: IArea; }
export interface ICityEntities { [key: number]: ICity; }
export type SelectedLocation = null | { city: number, area: number, point: IPoint };
export type SelectedLocationData = null | { city: ICity; area: IArea, point: IPoint };

export interface IFlatFormProperties {
  [key: string]: string | number;
}
