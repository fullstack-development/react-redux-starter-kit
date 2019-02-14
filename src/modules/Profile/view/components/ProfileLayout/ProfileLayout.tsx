import React from 'react';
import block from 'bem-cn';

import './ProfileLayout.scss';

const b = block('profile-layout');

function ProfileLayout() {
  return (
    <div className={b()}>
      N I C E  R 0 F L!
    </div>
  );
}

export default ProfileLayout;
