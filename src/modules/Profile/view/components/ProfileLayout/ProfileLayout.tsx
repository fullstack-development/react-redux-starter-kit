import React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import { featureConnect } from 'core';
import Layout from 'modules/shared/Layout/Layout';
import { useTranslation, tKeys } from 'services/i18n';

import './ProfileLayout.scss';

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IFeatureProps;

const b = block('profile-layout');

function ProfileLayout(props: IProps) {
  const { profileFeatureEntry: { containers } } = props;
  const { ProfileEdit } = containers;
  const { t } = useTranslation();

  return (
    <Layout title={t(tKeys.features.profile.editProfile.getKey())}>
      <div className={b()}>
        <ProfileEdit />
      </div>
    </Layout>
  );
}

export default featureConnect({
  profileFeatureEntry: features.profile.loadEntry,
})(ProfileLayout);
