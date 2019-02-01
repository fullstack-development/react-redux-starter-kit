import * as React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';
import { Typography } from 'shared/view/elements';

import './SearchLayout.scss';

interface IFeatureProps {
  githubSearchFeatureEntry: features.githubSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('search-layout');

class SearchLayout extends React.PureComponent<IProps> {
  public render() {
    const { githubSearchFeatureEntry } = this.props;
    return (
      <div className={b()}>
        <Typography variant="h4">
          GitHub user search
        </Typography>
        <div className={b('search-form')}>
          <githubSearchFeatureEntry.containers.UserSearchForm />
        </div>
        <githubSearchFeatureEntry.containers.UserSearchResults />
      </div>
    );
  }
}

export default featureConnect({
  githubSearchFeatureEntry: features.githubSearch.loadEntry,
})(SearchLayout);
