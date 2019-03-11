import React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import { featureConnect } from 'core';

import { withLayout } from '../../../../shared';
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

export { ProfileLayout, IProps as IProfileLayoutProps };
export default withLayout('Edit profile')(
  featureConnect({
    profileFeatureEntry: features.profile.loadEntry,
  })(ProfileLayout),
);
