import { IReduxState } from '../namespace';

const initialState: IReduxState = {
  communications: {
    categoriesFetching: {
      isRequesting: false,
      error: '',
    },
  },
  data: {
    options: [],
    selected: undefined,
  },
};

export default initialState;
