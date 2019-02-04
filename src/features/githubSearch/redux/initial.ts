import { initialCommunicationField } from 'shared/constants';
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
};

export default initial;
