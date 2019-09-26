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
        avatarURL: 'https://avatars1.githubusercontent.com/u/20162049?v=4',
        htmlURL: 'https://github.com/testerSunshine',
        followersNumber: 497,
        followingNumber: 0,
        reposNumber: 23,
        realName: 'wenxianping',
        location: '上海',
      },
    ],
  },
  repos: {
    saved: [],
  },
};

export default initial;
