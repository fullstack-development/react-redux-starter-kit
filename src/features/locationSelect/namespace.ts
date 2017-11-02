import { IAreaEntities, ICityEntities, SelectedLocation, ICommunication } from 'shared/types/models';

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
  IAreaEntities,
  ICityEntities,
  SelectedLocation,
};
