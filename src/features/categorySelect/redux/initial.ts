import CategorySelect from '../namespace';

const initialState: CategorySelect.InitialState = {
  communications: {
    categoriesFetching: {
      isRequesting: false,
      error: '',
    }
  },
  data: {
    options: [],
    selected: undefined,
  },
};

export default initialState;
