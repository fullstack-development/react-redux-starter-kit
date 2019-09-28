import { profile } from '../constants';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  edit: {
    profile,
  },
  users: {
    saved: [
      {
        id: 20162049,
        username: 'testerSunshine',
      },
    ],
  },
  repos: {
    saved: [
      {
        id: 37489525,
        name: 'pytest',
      },
    ],
  },
};

export default initial;
