import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/helpers/redux';

const initialState: IReduxState = {
  data: {
    categories: [],
  },
  edit: {
    selectedCategoryUid: { value: null, error: '' },
  },
  communications: {
    categoriesFetching: { ...initialCommunicationField },
  },
};

export default initialState;
