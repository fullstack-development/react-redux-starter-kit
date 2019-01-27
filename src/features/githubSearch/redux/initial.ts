import { initialCommunicationField } from 'shared/constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    foundUsers: [],
  },
  communication: {
    searchUser: initialCommunicationField,
  },
};

export default initial;
