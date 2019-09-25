import React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import * as features from 'features';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import featureConnect from 'core/FeatureConnector';

import { IAppReduxState } from 'shared/types/app';
import { IDetailedGithubUser } from 'shared/types/models';
import { saveUser, removeUser } from 'features/profile/redux/actions';
import { selectUsers } from 'features/profile/redux/selectors';

import { Layout } from '../../../../shared';
import './UsersSearchLayout.scss';

interface IState {
  lastSubmittedFormState: features.usersSearch.namespace.IUsersSearchFormFields | null;
}

interface IFeatureProps {
  usersSearchFeatureEntry: features.usersSearch.Entry;
}

interface IStateProps {
  users: IDetailedGithubUser[];
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps & IFeatureProps & ITranslationProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    users: selectUsers(state),
  };
}

const mapDispatch = { onSave: saveUser, onRemove: removeUser };

const b = block('users-search-layout');

class UsersSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedFormState: null,
  };

  public render() {
    const {
      usersSearchFeatureEntry: { containers },
      t,
      users,
      onSave,
      onRemove,
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
              onSave={onSave}
              onRemove={onRemove}
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
})(withTranslation()(connectedComponent));
