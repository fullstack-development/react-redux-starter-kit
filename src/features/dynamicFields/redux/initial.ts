import DynamicFields from '../namespace';

const initialState: DynamicFields.InitialState = {
  communications: {
    fetching: {
      isRequesting: false,
      error: '',
    }
  },
  data: {
    fields: {},
    values: {},
  },
};

export default initialState;
