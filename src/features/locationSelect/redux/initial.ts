import Namespace from '../namespace';

const initialState: Namespace.InitialState = {
  communications: {
    citiesFetching: {
      isRequesting: false,
      error: '',
    }
  },
  data: {
    entities: {
      areas: {},
      cities: {}
    },
    citiesSet: [],
    selectedLocation: null
  },
  ui: {
    showSelectedLocation: false
  }
};

export default initialState;
