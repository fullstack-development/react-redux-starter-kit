import React from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import * as features from 'features';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import featureConnect from 'core/FeatureConnector';

import { Layout } from '../../../../shared';
import './UsersSearchLayout.scss';

interface IState {
  lastSubmittedFormState: features.usersSearch.namespace.IUsersSearchFormFields | null;
}

interface IFeatureProps {
  usersSearchFeatureEntry: features.usersSearch.Entry;
}

type IProps = IFeatureProps & ITranslationProps;

const b = block('users-search-layout');

class UsersSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedFormState: null,
  };

  public render() {
    const { usersSearchFeatureEntry: { containers }, t } = this.props;
    const { UsersSearchForm, UsersSearchResults } = containers;
    const { lastSubmittedFormState } = this.state;

    return (
      <Layout title={t(tKeys.features.userSearch.usersSearch)}>
        <div className={b()}>
          <div className={b('search-form')}>
            <UsersSearchForm onSubmit={this.setLastSubmittedFormState} />
          </div>
          {lastSubmittedFormState && <UsersSearchResults searchOptions={lastSubmittedFormState} />}
        </div>
      </Layout>
    );
  }

  @autobind
  private setLastSubmittedFormState(formState: features.usersSearch.namespace.IUsersSearchFormFields) {
    this.setState({ lastSubmittedFormState: formState });
  }
}

export { UsersSearchLayout, IProps as IUsersSearchLayoutProps };
export default featureConnect({
  usersSearchFeatureEntry: features.usersSearch.loadEntry,
})(withTranslation()(UsersSearchLayout));
