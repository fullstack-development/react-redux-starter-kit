import * as React from 'react';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';

interface IFeatureProps {
  githubSearchFeatureEntry: features.githubSearch.Entry;
}

type IProps = IFeatureProps;

class SearchLayout extends React.PureComponent<IProps> {
  public render() {
    const { githubSearchFeatureEntry } = this.props;
    return (
      <div className="">
        <githubSearchFeatureEntry.containers.UserSearchForm />
        <githubSearchFeatureEntry.containers.UserSearchResults />
      </div>
    );
  }
}

export default featureConnect({
  githubSearchFeatureEntry: features.githubSearch.loadEntry,
})(SearchLayout);
