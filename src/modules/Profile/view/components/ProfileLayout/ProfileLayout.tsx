import React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import { featureConnect } from 'core';

import './ProfileLayout.scss';

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IFeatureProps;

const b = block('profile-layout');

function ProfileLayout(props: IProps) {
  const { profileFeatureEntry: { containers } } = props;
  const { ProfileEdit } = containers;
  return (
    <div className={b()}>
      <ProfileEdit />
    </div>
  );
}

export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(ProfileLayout);
