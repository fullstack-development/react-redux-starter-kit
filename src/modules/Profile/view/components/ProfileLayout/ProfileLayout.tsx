import React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import { withAsyncFeatures } from 'core';
import { useTranslation, tKeys } from 'services/i18n';

import { Layout } from '../../../../shared';
import './ProfileLayout.scss';

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IFeatureProps;

const b = block('profile-layout');

function ProfileLayoutComponent(props: IProps) {
  const { profileFeatureEntry: { containers } } = props;
  const { ProfileEdit } = containers;
  const { t } = useTranslation();

  return (
    <Layout title={t(tKeys.features.profile.editProfile)}>
      <div className={b()}>
        <ProfileEdit />
      </div>
    </Layout>
  );
}

const ProfileLayout = withAsyncFeatures({
  profileFeatureEntry: features.profile.loadEntry,
})(ProfileLayoutComponent);

export { ProfileLayout, ProfileLayoutComponent, IProps as IProfileLayoutProps };
