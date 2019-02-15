import React from 'react';
import block from 'bem-cn';

import './ProfileAvatar.scss';

interface IProps {
  avatarURL: string;
  size: 'small' | 'big';
}

const b = block('profile-avatar');

function ProfileAvatar(props: IProps) {
  const { avatarURL, size } = props;
  return (
    <div className={b({ size })} style={{ backgroundImage: `url(${avatarURL})` }} />
  );
}

export default ProfileAvatar;
