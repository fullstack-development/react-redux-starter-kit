import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';
import { Typography } from 'shared/view/elements';

import Layout from '../Layout/Layout';
import './UserSearchLayout.scss';

interface IState {
  lastSubmittedSearchFormState: features.userSearch.namespace.IUserSearchFormFields | null;
}

interface IFeatureProps {
  userSearchFeatureEntry: features.userSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('user-search-layout');

class UserSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedSearchFormState: null,
  };

  public render() {
    const { userSearchFeatureEntry: { containers } } = this.props;
    const { UserSearchForm, UserSearchResults, UserSearchPagination } = containers;
    const { lastSubmittedSearchFormState } = this.state;
    return (
      <Layout>
        <div className={b()}>
          <Typography variant="h4">
            GitHub user search
          </Typography>
          <div className={b('search-form')}>
            <UserSearchForm onSubmit={this.handleUserSearchFormSubmit} />
          </div>
          <UserSearchResults />
          {lastSubmittedSearchFormState &&
            <UserSearchPagination formFields={lastSubmittedSearchFormState} />
          }
        </div>
      </Layout>
    );
  }

  @bind
  private handleUserSearchFormSubmit(values: features.userSearch.namespace.IUserSearchFormFields) {
    this.setState({ lastSubmittedSearchFormState: values });
  }
}

export default featureConnect({
  userSearchFeatureEntry: features.userSearch.loadEntry,
})(UserSearchLayout);
