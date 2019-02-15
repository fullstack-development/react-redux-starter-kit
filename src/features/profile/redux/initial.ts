import { IReduxState } from '../namespace';

const initial: IReduxState = {
  edit: {
    profile: {
      name: 'Profile name',
      nickname: 'Nickname',
      age: 420,
      bio: 'Nice rofl',
      avatarURL: 'https://404store.com/2017/12/08/Er-weird-O-o-random-23398022-600-678.jpg',
    },
  },
};

export default initial;
