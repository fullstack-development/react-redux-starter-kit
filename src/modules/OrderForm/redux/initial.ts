import { IReduxState } from '../namespace';

const initialState: IReduxState = {
  communications: {
    saving: {
      isRequesting: false,
      error: '',
    },
  },
  data: null,
};

export default initialState;
