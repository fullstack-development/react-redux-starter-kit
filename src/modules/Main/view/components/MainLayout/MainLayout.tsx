import React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import { featureConnect } from 'core';

import './MainLayout.scss';

interface IFeatureProps {
  featureExample: features.featureExample.Entry;
}

type IProps = IFeatureProps;

const b = block('main-layout');

function MainLayout(props: IProps) {
  const { featureExample: { containers } } = props;
  const { FeatureExample } = containers;

  return (
    <div className={b()}>
      <FeatureExample />
    </div>
  );
}

export { MainLayout, IProps as IMainLayoutProps };
export default featureConnect({
  featureExample: features.featureExample.loadEntry,
})(MainLayout);
