import { initialCommunicationField, initialPaginationState } from 'shared/constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    foundRepositories: [],
    totalResults: 0,
  },
  communication: {
    searchRepositories: initialCommunicationField,
  },
  ui: {
    repositoriesSearchPaginationState: initialPaginationState,
  },
};

export default initial;
