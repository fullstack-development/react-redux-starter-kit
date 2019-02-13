import { initialCommunicationField } from 'shared/constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    foundUsers: null,
    userDetails: null,
  },
  communication: {
    searchUser: initialCommunicationField,
    loadUserDetails: initialCommunicationField,
  },
  ui: {
    usersSearchPaginationState: null,
  },
};

export default initial;
