import { IArea, ICity, IPoint, IAreaEntities, ICityEntities } from 'shared/types/models';
import { ICommunicationState } from 'shared/helpers/redux';

type SelectedLocation = null | { city: number, area: number, point: IPoint };
type SelectedLocationData = null | { city: ICity; area: IArea, point: IPoint };

interface IReduxState {
  communications: {
    citiesFetching: ICommunicationState;
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
  IReduxState,
  IAreaEntities,
  ICityEntities,
  SelectedLocationData,
  SelectedLocation,
};
