import { IReduxState } from '../../namespace';

const initialState: IReduxState = {
  communications: {
    fetching: {
      isRequesting: false,
      error: '',
    },
  },
  data: {
    fields: {},
    values: {},
  },
};

export default initialState;
