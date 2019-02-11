import * as React from 'react';
import block from 'bem-cn';
// import { bind } from 'decko';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';
import { Typography } from 'shared/view/elements';

import Layout from '../Layout/Layout';
import './RepositoriesSearchLayout.scss';

interface IState {
  lastSubmittedSearchFormState: features.userSearch.namespace.IUserSearchFormFields | null;
}

interface IFeatureProps {
  repositoriesSearchFeatureEntry: features.repositoriesSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('repositories-search-layout');

class RepositoriesSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedSearchFormState: null,
  };

  public render() {
    const { repositoriesSearchFeatureEntry: { containers } } = this.props;
    const { RepositoriesSearchForm, RepositoriesSearchResults } = containers;
    // const { lastSubmittedSearchFormState } = this.state;
    return (
      <Layout>
        <div className={b()}>
          <Typography variant="h4">
            GitHub repositories search
          </Typography>
          <div className={b('search-form')}>
            <RepositoriesSearchForm />
          </div>
          <div className={b('search-results')}>
            <RepositoriesSearchResults />
          </div>
          {/* <UserSearchResults />
          {lastSubmittedSearchFormState &&
            <UserSearchPagination formFields={lastSubmittedSearchFormState} />
          } */}
        </div>
      </Layout>
    );
  }

  // @bind
  // private handleUserSearchFormSubmit(values: features.userSearch.namespace.IUserSearchFormFields) {
  //   this.setState({ lastSubmittedSearchFormState: values });
  // }
}

export default featureConnect({
  repositoriesSearchFeatureEntry: features.repositoriesSearch.loadEntry,
})(RepositoriesSearchLayout);
