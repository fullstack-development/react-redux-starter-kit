import { ICommunicationState } from 'shared/helpers/redux';
import { IReduxState, IData } from '../../namespace';

const initialCommunicationState: ICommunicationState = {
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
