import { initialCommunicationField, initialPaginationState } from 'shared/constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    foundUsers: [],
    userDetails: null,
    totalResults: 0,
  },
  communication: {
    searchUser: initialCommunicationField,
    loadUserDetails: initialCommunicationField,
  },
  ui: {
    usersSearchPaginationState: initialPaginationState,
  },
};

export default initial;
