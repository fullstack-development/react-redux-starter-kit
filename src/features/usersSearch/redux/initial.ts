import { initialCommunicationField, initialPaginationState } from 'shared/constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    foundUsers: [],
    userDetails: null,
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
