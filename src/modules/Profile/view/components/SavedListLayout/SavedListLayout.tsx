import React from 'react';

import * as features from 'features';
import { featureConnect } from 'core';

import { Layout } from '../../../../shared';

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}
type IProps = IFeatureProps;

function SavedListLayout(props: IProps) {
  const {
    profileFeatureEntry: { containers },
  } = props;
  const { ProfileSavedList } = containers;

  return (
    <Layout title="Saved repos/users">
      <ProfileSavedList />
    </Layout>
  );
}

export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(SavedListLayout);
