import { autobind } from 'core-decorators';
import React from 'react';
import block from 'bem-cn';

import * as usersSearch from 'features/usersSearch';
import { withAsyncFeatures } from 'core';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import {SearchLayout} from "../SearchLayout/SearchLayout";
import { Layout } from '../../../../shared';
import './UsersSearchLayout.scss';

interface IState {
  lastSubmittedFormState: usersSearch.namespace.IUsersSearchFormFields | null;
}

interface IFeatureProps {
  usersSearchFeatureEntry: usersSearch.Entry;
}

type IProps = IFeatureProps & ITranslationProps;

const b = block('users-search-layout');

class UsersSearchLayoutComponent extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedFormState: null,
  };

  public render() {
    const { usersSearchFeatureEntry: { containers }, t } = this.props;
    const { UsersSearchForm, UsersSearchResults } = containers;
    const { lastSubmittedFormState } = this.state;

    return (
      <Layout title={t(tKeys.shared.header.searchFor)}>
        <SearchLayout>
          <div className={b()}>
            <div className={b('search-form')}>
              <UsersSearchForm onSubmit={this.setLastSubmittedFormState} />
            </div>
            {lastSubmittedFormState && <UsersSearchResults searchOptions={lastSubmittedFormState} />}
          </div>
        </SearchLayout>
      </Layout>
    );
  }

  @autobind
  private setLastSubmittedFormState(formState: usersSearch.namespace.IUsersSearchFormFields) {
    this.setState({ lastSubmittedFormState: formState });
  }
}

const UsersSearchLayout = withAsyncFeatures({
  usersSearchFeatureEntry: usersSearch.loadEntry,
})(withTranslation()(UsersSearchLayoutComponent));


export { UsersSearchLayout, UsersSearchLayoutComponent, IProps as IUsersSearchLayoutProps };
