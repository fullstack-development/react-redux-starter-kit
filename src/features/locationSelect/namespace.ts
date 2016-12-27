declare namespace LocationSelect {
  interface Communication {
    isRequesting: boolean;
    error: string;
  }


  interface AreaResponse {
    city: number;
    display_name: string;
    name: string;
    point: string;
  }

  interface CityResponse {
    areas: Array<AreaResponse>;
    name: string;
    id: number;
  }

  interface Point {
    lat: number;
    lng: number;
  }

  interface Area {
    displayName: string;
    name: string;
    city: number;
    point: Point;
    id: number;
  }

  interface City {
    areas: Array<number>;
    name: string;
    id: number;
  }

  interface NormalizedCitiesResponse {
    result: Array<number>;
    entities: {
      cities: CityEntities,
      areas: AreaEntities
    };
  }

  type AreaEntities = { [key: number]: Area };
  type CityEntities = { [key: number]: City };
  type SelectedLocation = null | { city: number, area: number, point: Point };
  type SelectedLocationData = null | { city: City; area: Area, point: Point };

  interface InitialState {
    communications: {
      citiesFetching: Communication
    };
    data: {
      entities: {
        areas: AreaEntities,
        cities: CityEntities
      },
      citiesSet: Array<number>,
      selectedLocation: SelectedLocation
    };
    ui: {
      showSelectedLocation: boolean;
    };
  }
}

export default LocationSelect;