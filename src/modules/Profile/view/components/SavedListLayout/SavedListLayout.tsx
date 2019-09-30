import React from 'react';

import * as features from 'features';
import { featureConnect } from 'core';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import { Layout } from '../../../../shared';

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}
type IProps = IFeatureProps & ITranslationProps;

const { profile: intl } = tKeys.modules;

function SavedListLayout(props: IProps) {
  const {
    profileFeatureEntry: { containers },
    t,
  } = props;
  const { ProfileSavedList } = containers;

  return (
    <Layout title={t(intl.savedPageTitle)}>
      <ProfileSavedList />
    </Layout>
  );
}

export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(withTranslation()(SavedListLayout));
