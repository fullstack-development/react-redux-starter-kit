interface ICommunication {
  isRequesting: boolean;
  error: string;
}

interface IAreaResponse {
  city: number;
  display_name: string;
  name: string;
  point: string;
}

interface ICityResponse {
  areas: IAreaResponse[];
  name: string;
  id: number;
}

interface IPoint {
  lat: number;
  lng: number;
}

interface IArea {
  displayName: string;
  name: string;
  city: number;
  point: IPoint;
  id: number;
}

interface ICity {
  areas: number[];
  name: string;
  id: number;
}

interface INormalizedCitiesResponse {
  result: number[];
  entities: {
    cities: IAreaEntities;
    areas: ICityEntities;
  };
}

interface IAreaEntities { [key: number]: IArea; };
interface ICityEntities { [key: number]: ICity; };
type SelectedLocation = null | { city: number, area: number, point: IPoint };
type SelectedLocationData = null | { city: ICity; area: IArea, point: IPoint };

interface IReduxState {
  communications: {
    citiesFetching: ICommunication;
  };
  data: {
    entities: {
      areas: IAreaEntities;
      cities: ICityEntities;
    },
    citiesSet: number[],
    selectedLocation: SelectedLocation;
  };
  ui: {
    showSelectedLocation: boolean;
  };
}

export {
  ICommunication,
  IReduxState,
  IAreaResponse,
  ICityResponse,
  IPoint,
  IArea,
  ICity,
  IAreaEntities,
  ICityEntities,
  INormalizedCitiesResponse,
  SelectedLocationData,
  SelectedLocation,
};
