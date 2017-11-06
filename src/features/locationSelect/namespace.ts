import { IArea, ICity, IPoint, IAreaEntities, ICityEntities, ILocation } from 'shared/types/models';
import { ICommunicationState } from 'shared/helpers/redux';

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
    selectedLocation: ILocation | null;
  };
  ui: {
    showSelectedLocation: boolean;
  };
}

export {
  IReduxState,
  SelectedLocationData,
};
