import React from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import { Layout } from '../../../../shared';
import './RepositoriesSearchLayout.scss';

interface IState {
  lastSubmittedFormState: features.repositoriesSearch.namespace.IRepositoriesSearchFormFields | null;
}

interface IFeatureProps {
  repositoriesSearchFeatureEntry: features.repositoriesSearch.Entry;
}

type IProps = IFeatureProps & ITranslationProps;

const b = block('repositories-search-layout');

class RepositoriesSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedFormState: null,
  };

  public render() {
    const { repositoriesSearchFeatureEntry: { containers }, t } = this.props;
    const { RepositoriesSearchForm, RepositoriesSearchResults } = containers;
    const { lastSubmittedFormState } = this.state;

    return (
      <Layout title={t(tKeys.features.userSearch.repositoriesSearch)}>
        <div className={b()}>
          <div className={b('search-form')}>
            <RepositoriesSearchForm onSubmit={this.setLastSubmittedFormState} />
          </div>
          <div className={b('results')}>
            {lastSubmittedFormState &&
              <RepositoriesSearchResults searchOptions={lastSubmittedFormState} />
            }
          </div>
        </div>
      </Layout>
    );
  }

  @autobind
  private setLastSubmittedFormState(formState: features.repositoriesSearch.namespace.IRepositoriesSearchFormFields) {
    this.setState({ lastSubmittedFormState: formState });
  }
}

export { RepositoriesSearchLayout, IProps as IRepositoriesSearchLayoutProps };
export default featureConnect({
  repositoriesSearchFeatureEntry: features.repositoriesSearch.loadEntry,
})(withTranslation()(RepositoriesSearchLayout));
