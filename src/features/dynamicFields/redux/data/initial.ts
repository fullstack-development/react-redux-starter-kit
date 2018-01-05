import { IReduxState } from '../../namespace';

const initialState: IReduxState = {
  communication: {
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
