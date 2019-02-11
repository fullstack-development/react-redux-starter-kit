import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';
import { Typography } from 'shared/view/elements';

import Layout from '../Layout/Layout';
import './RepositoriesSearchLayout.scss';

interface IState {
  lastSubmittedSearchString: string | null;
}

interface IFeatureProps {
  repositoriesSearchFeatureEntry: features.repositoriesSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('repositories-search-layout');

class RepositoriesSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedSearchString: null,
  };

  public render() {
    const { repositoriesSearchFeatureEntry: { containers } } = this.props;
    const { RepositoriesSearchForm, RepositoriesSearchResults, RepositoriesSearchPagination } = containers;
    const { lastSubmittedSearchString } = this.state;
    return (
      <Layout>
        <div className={b()}>
          <Typography variant="h4">
            GitHub repositories search
          </Typography>
          <div className={b('search-form')}>
            <RepositoriesSearchForm onSubmit={this.handleRepositoriesSearchFormSubmit}/>
          </div>
          <div className={b('search-results')}>
            <RepositoriesSearchResults />
          </div>
          {lastSubmittedSearchString !== null &&
            <RepositoriesSearchPagination searchString={lastSubmittedSearchString} />
          }
        </div>
      </Layout>
    );
  }

  @bind
  private handleRepositoriesSearchFormSubmit(searchString: string) {
    this.setState({ lastSubmittedSearchString: searchString });
  }
}

export default featureConnect({
  repositoriesSearchFeatureEntry: features.repositoriesSearch.loadEntry,
})(RepositoriesSearchLayout);
