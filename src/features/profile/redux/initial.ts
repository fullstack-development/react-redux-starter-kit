import avatar from 'assets/profile_avatar.png';
import { IReduxState } from '../namespace';

const initial: IReduxState = {
  edit: {
    profile: {
      name: 'Vladislav the Poker',
      nickname: 'Vladislav9124',
      age: 862,
      bio: 'I became a vampire when I was sixteen. That is why I always look sixteen.',
      avatarURL: avatar,
    },
  },
};

export default initial;
