import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'shared/types/redux';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import * as features from 'features';
import featureConnect from 'core/FeatureConnector';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import { Layout } from '../../../../shared';
import './RepositoriesSearchLayout.scss';
import { IAppReduxState } from 'shared/types/app';
import { IDetailedGithubUser, IRepository } from 'shared/types/models';

interface IState {
  lastSubmittedFormState: features.repositoriesSearch.namespace.IRepositoriesSearchFormFields | null;
}

interface IFeatureProps {
  repositoriesSearchFeatureEntry: features.repositoriesSearch.Entry;
  profileFeatureEntry: features.profile.Entry;
}

interface IStateProps {
  users: IDetailedGithubUser[];
  repos: IRepository[];
}

interface IActionProps {
  saveUser: Action<features.profile.namespace.ISaveUser>;
  removeUser: Action<features.profile.namespace.IRemoveUser>;
  saveRepo: Action<features.profile.namespace.ISaveRepo>;
  removeRepo: Action<features.profile.namespace.IRemoveRepo>;
}

type IProps = IStateProps & IActionProps & IFeatureProps & ITranslationProps;

const mapState = (
  state: IAppReduxState,
  { profileFeatureEntry: { selectors } }: IFeatureProps,
) => ({
  users: selectors.selectUsers(state),
  repos: selectors.selectRepos(state),
});

function mapDispatch(
  dispatch: Dispatch<any>,
  {
    profileFeatureEntry: {
      actions: { saveUser, removeUser, saveRepo, removeRepo },
    },
  }: IFeatureProps,
): IActionProps {
  return bindActionCreators(
    {
      saveUser,
      removeUser,
      saveRepo,
      removeRepo,
    },
    dispatch,
  );
}

const b = block('repositories-search-layout');

class RepositoriesSearchLayout extends React.PureComponent<IProps, IState> {
  public state: IState = {
    lastSubmittedFormState: null,
  };

  public render() {
    const {
      repositoriesSearchFeatureEntry: { containers },
      saveUser,
      removeUser,
      saveRepo,
      removeRepo,
      users,
      repos,
      t,
    } = this.props;
    const { RepositoriesSearchForm, RepositoriesSearchResults } = containers;
    const { lastSubmittedFormState } = this.state;

    return (
      <Layout title={t(tKeys.features.userSearch.repositoriesSearch)}>
        <div className={b()}>
          <div className={b('search-form')}>
            <RepositoriesSearchForm onSubmit={this.setLastSubmittedFormState} />
          </div>
          <div className={b('results')}>
            {lastSubmittedFormState && (
              <RepositoriesSearchResults
                searchOptions={lastSubmittedFormState}
                savedRepos={repos}
                savedUsers={users}
                onRepoSave={saveRepo}
                onRepoRemove={removeRepo}
                onUserSave={saveUser}
                onUserRemove={removeUser}
              />
            )}
          </div>
        </div>
      </Layout>
    );
  }

  @autobind
  private setLastSubmittedFormState(
    formState: features.repositoriesSearch.namespace.IRepositoriesSearchFormFields,
  ) {
    this.setState({ lastSubmittedFormState: formState });
  }
}

export { RepositoriesSearchLayout, IProps as IRepositoriesSearchLayoutProps };
const connectedComponent = connect(
  mapState,
  mapDispatch,
)(RepositoriesSearchLayout);
export default featureConnect({
  repositoriesSearchFeatureEntry: features.repositoriesSearch.loadEntry,
  profileFeatureEntry: features.profile.loadEntry,
})(withTranslation()(connectedComponent));
