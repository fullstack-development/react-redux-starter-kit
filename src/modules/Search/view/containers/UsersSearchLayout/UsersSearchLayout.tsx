import React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import * as features from 'features';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import featureConnect from 'core/FeatureConnector';

import { saveUser, removeUser } from 'features/profile/redux/actions';

import { IDetailedGithubUser } from 'shared/types/models';

import { Layout } from '../../../../shared';
import './UsersSearchLayout.scss';
import { IAppReduxState } from 'shared/types/app';

interface IState {
  lastSubmittedFormState: features.usersSearch.namespace.IUsersSearchFormFields | null;
}

interface IFeatureProps {
  usersSearchFeatureEntry: features.usersSearch.Entry;
  profileFeatureEntry: features.profile.Entry;
}

interface IStateProps {
  users: IDetailedGithubUser[];
}

type IProps = IStateProps &
  typeof mapDispatch &
  IFeatureProps &
  ITranslationProps;

const mapState = (
  state: IAppReduxState,
  { profileFeatureEntry: { selectors } }: IProps,
) => ({
  users: selectors.selectUsers(state),
});

const mapDispatch = { saveUser, removeUser };

const b = block('users-search-layout');

class UsersSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedFormState: null,
  };

  public render() {
    const {
      usersSearchFeatureEntry: { containers },
      saveUser,
      removeUser,
      users,
      t,
    } = this.props;
    const { UsersSearchForm, UsersSearchResults } = containers;
    const { lastSubmittedFormState } = this.state;

    return (
      <Layout title={t(tKeys.features.userSearch.usersSearch)}>
        <div className={b()}>
          <div className={b('search-form')}>
            <UsersSearchForm onSubmit={this.setLastSubmittedFormState} />
          </div>
          {lastSubmittedFormState && (
            <UsersSearchResults
              searchOptions={lastSubmittedFormState}
              savedUsers={users}
              onSave={saveUser}
              onRemove={removeUser}
            />
          )}
        </div>
      </Layout>
    );
  }

  @autobind
  private setLastSubmittedFormState(
    formState: features.usersSearch.namespace.IUsersSearchFormFields,
  ) {
    this.setState({ lastSubmittedFormState: formState });
  }
}

export { UsersSearchLayout, IProps as IUsersSearchLayoutProps };
const connectedComponent = connect(
  mapState,
  mapDispatch,
)(UsersSearchLayout);
export default featureConnect({
  usersSearchFeatureEntry: features.usersSearch.loadEntry,
  profileFeatureEntry: features.profile.loadEntry,
})(withTranslation()(connectedComponent));
