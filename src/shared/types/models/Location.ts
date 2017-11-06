import { ILocationProperties } from './DynamicFields';

export interface IOrder {
  attributes: IAttributes;
  fromLocation: IPoint;
  location: ILocation;
  locationValues: ILocationProperties;
  selectedCategoryUid: number;
}

export interface IAttributes {
  [key: string]: string | number;
}

export interface ILocation {
  city: number;
  area: number;
  point: IPoint;
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

export interface IPoint {
  lat: number;
  lng: number;
}

export interface INormalizedCities {
  result: number[];
  entities: {
    cities: IAreaEntities;
    areas: ICityEntities;
  };
}

export interface IAreaEntities {
  [key: number]: IArea;
}

export interface ICityEntities {
  [key: number]: ICity;
}
