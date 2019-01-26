import * as React from 'react';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';

interface IFeatureProps {
  buyCakesFeatureEntry: features.buyCakesFeature.Entry;
}

type IProps = IFeatureProps;

class BuyCakesLayout extends React.PureComponent<IProps> {
  public render() {
    const { buyCakesFeatureEntry } = this.props;
    return (
      <div className="">
        <buyCakesFeatureEntry.containers.CakePreviewList />
      </div>
    );
  }
}

export default featureConnect({
  buyCakesFeatureEntry: features.buyCakesFeature.loadEntry,
})(BuyCakesLayout);
