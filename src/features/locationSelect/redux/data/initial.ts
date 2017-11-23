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
  },
  ui: {
    showSelectedLocation: false,
  },
};

export default initialState;
