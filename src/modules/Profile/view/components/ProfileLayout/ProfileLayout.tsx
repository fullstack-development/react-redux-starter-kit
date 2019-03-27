import React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import { featureConnect } from 'core';

import { Layout } from '../../../../shared';
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
    <Layout title="Edit profile">
      <div className={b()}>
        <ProfileEdit />
      </div>
    </Layout>
  );
}

export { ProfileLayout, IProps as IProfileLayoutProps };
export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(ProfileLayout);
