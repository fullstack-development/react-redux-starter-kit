import { IReduxState } from '../../namespace';

const initialState: IReduxState = {
  communications: {
    citiesFetching: {
      isRequesting: false,
      error: '',
    },
  },
  data: {
    entities: {
      areas: {},
      cities: {},
    },
    citiesSet: [],
    selectedLocation: null,
  },
  ui: {
    showSelectedLocation: false,
  },
};

export default initialState;
