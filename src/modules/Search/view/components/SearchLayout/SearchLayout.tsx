import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';
import { Typography } from 'shared/view/elements';

import './SearchLayout.scss';

interface IState {
  lastSubmittedSearchFormState: features.githubSearch.namespace.IUserSearchFormFields | null;
}

interface IFeatureProps {
  githubSearchFeatureEntry: features.githubSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('search-layout');

class SearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedSearchFormState: null,
  };

  public render() {
    const { githubSearchFeatureEntry: { containers } } = this.props;
    const { UserSearchForm, UserSearchResults, UserSearchPagination } = containers;
    const { lastSubmittedSearchFormState } = this.state;
    return (
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
    );
  }

  @bind
  private handleUserSearchFormSubmit(values: features.githubSearch.namespace.IUserSearchFormFields) {
    this.setState({ lastSubmittedSearchFormState: values });
  }
}

export default featureConnect({
  githubSearchFeatureEntry: features.githubSearch.loadEntry,
})(SearchLayout);
