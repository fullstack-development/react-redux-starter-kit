import { profile } from '../constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  edit: {
    profile,
  },
  users: {
    saved: [],
  },
  repos: {
    saved: [],
  },
};

export default initial;
