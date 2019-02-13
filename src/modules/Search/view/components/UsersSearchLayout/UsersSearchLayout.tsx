import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';
import { Typography } from 'shared/view/elements';

import Layout from '../Layout/Layout';
import './UsersSearchLayout.scss';

interface IState {
  lastSubmittedSearchFormState: features.usersSearch.namespace.IUsersSearchFormFields | null;
}

interface IFeatureProps {
  usersSearchFeatureEntry: features.usersSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('users-search-layout');

class UsersSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedSearchFormState: null,
  };

  public render() {
    const { usersSearchFeatureEntry: { containers } } = this.props;
    const { UsersSearchForm, UsersSearchResults, UsersSearchPagination } = containers;
    const { lastSubmittedSearchFormState } = this.state;
    return (
      <Layout>
        <div className={b()}>
          <Typography variant="h4">
            GitHub user search
          </Typography>
          <div className={b('search-form')}>
            <UsersSearchForm onSubmit={this.handleUsersSearchFormSubmit} />
          </div>
          <UsersSearchResults />
          {lastSubmittedSearchFormState &&
            <UsersSearchPagination formFields={lastSubmittedSearchFormState} />
          }
        </div>
      </Layout>
    );
  }

  @bind
  private handleUsersSearchFormSubmit(values: features.usersSearch.namespace.IUsersSearchFormFields) {
    this.setState({ lastSubmittedSearchFormState: values });
  }
}

export default featureConnect({
  usersSearchFeatureEntry: features.usersSearch.loadEntry,
})(UsersSearchLayout);
