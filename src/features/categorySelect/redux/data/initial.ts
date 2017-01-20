import { IReduxState, ICommunication, IData } from '../../namespace';

const initialCommunicationState: ICommunication = {
  isRequesting: false,
  error: '',
};

const initialDataState: IData = {
  options: [],
  selected: null,
};

/* Construct main feature state from defined parts */
const initialState: IReduxState = {
  communications: {
    categoriesFetching: { ...initialCommunicationState },
  },
  data: { ...initialDataState },
};

export { initialCommunicationState, initialDataState };
export default initialState;
