import { initialCommunicationField } from 'shared/constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    foundRepositories: null,
  },
  communication: {
    searchRepositories: initialCommunicationField,
  },
  ui: {
    repositoriesSearchPaginationState:  null,
  },
};

export default initial;
