import { initialCommunicationField, initialPaginationState } from 'shared/constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    foundRepositories: [],
  },
  communication: {
    searchRepositories: initialCommunicationField,
  },
  ui: {
    repositoriesSearchPaginationState: initialPaginationState,
  },
};

export default initial;
