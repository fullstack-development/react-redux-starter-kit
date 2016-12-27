import HomeModule from '../namespace';

const initialState: HomeModule.InitialState = {
  communications: {
    saving: {
      isRequesting: false,
      error: '',
    }
  },
  data: null,
};

export default initialState;
