import { initialCommunicationField } from 'shared/constants';

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
  communication: {
    loadRepository: initialCommunicationField,
  },
  data: {
    repository: null,
  },
};

export default initial;
