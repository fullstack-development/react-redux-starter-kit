import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';

import { withLayout } from '../../../../shared';
import './RepositoriesSearchLayout.scss';

interface IState {
  lastSubmittedFormState: features.repositoriesSearch.namespace.IRepositoriesSearchFormFields | null;
}

interface IFeatureProps {
  repositoriesSearchFeatureEntry: features.repositoriesSearch.Entry;
}

type IProps = IFeatureProps;

const b = block('repositories-search-layout');

class RepositoriesSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedFormState: null,
  };

  public render() {
    const { repositoriesSearchFeatureEntry: { containers } } = this.props;
    const { RepositoriesSearchForm, RepositoriesSearchResults } = containers;
    const { lastSubmittedFormState } = this.state;

    return (
      <div className={b()}>
        <div className={b('search-form')}>
          <RepositoriesSearchForm onSubmit={this.setLastSubmittedFormState}/>
        </div>
        <div className={b('results')}>
          {lastSubmittedFormState &&
            <RepositoriesSearchResults searchOptions={lastSubmittedFormState} />
          }
        </div>
      </div>
    );
  }

  @bind
  private setLastSubmittedFormState(formState: features.repositoriesSearch.namespace.IRepositoriesSearchFormFields) {
    this.setState({ lastSubmittedFormState: formState });
  }
}

export { RepositoriesSearchLayout, IProps as IRepositoriesSearchLayoutProps  };
export default withLayout('GitHub repositories search')(
  featureConnect({
    repositoriesSearchFeatureEntry: features.repositoriesSearch.loadEntry,
  })(RepositoriesSearchLayout),
);
