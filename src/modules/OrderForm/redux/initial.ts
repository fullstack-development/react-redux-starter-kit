import { IReduxState } from '../namespace';

const initialState: IReduxState = {
  communications: {
    saving: {
      isRequesting: false,
      error: '',
    },
  },
  data: {
    message: null,
  },
};

export default initialState;
