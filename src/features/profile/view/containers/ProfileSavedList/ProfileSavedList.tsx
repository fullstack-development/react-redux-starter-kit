import React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import { ISavedGithubUser, ISavedRepository } from 'shared/types/models';
import { IAppReduxState } from 'shared/types/app';
import { IContainerTypes, containersProvider } from 'core';

import ProfileRepositoryPreview from '../ProfileRepositoryPreview/ProfileRepositoryPreview';
import { ProfileList } from '../../components';
import { selectors, actions } from '../../../redux';
import './ProfileSavedList.scss';

interface IStateProps {
  repos: ISavedRepository[];
  users: ISavedGithubUser[];
}

type IActionProps = typeof mapDispatch;

interface IContainerProviderProps {
  UserDetails: IContainerTypes['UserDetails'];
}

type IProps = IStateProps & IActionProps & IContainerProviderProps;

interface IState {
  displayedUserId: number | null;
  displayedRepoId: number | null;
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    repos: selectors.selectRepos(state),
    users: selectors.selectUsers(state),
  };
}

const mapDispatch = {
  removeRepo: actions.removeRepo,
  removeUser: actions.removeUser,
  saveUser: actions.saveUser,
  saveRepo: actions.saveRepo,
};

const b = block('profile-saved-list');

class ProfileSavedList extends React.Component<IProps, IState> {
  public state = {
    displayedUserId: null,
    displayedRepoId: null,
  };

  public render() {
    const { users, repos } = this.props;
    const userList = users.map(({ id, username }) => ({ id, title: username }));
    const repoList = repos.map(({ id, name }) => ({ id, title: name }));

    return (
      <div className={b()}>
        <div className={b('list-container')}>
          <div className={b('repos')}>
            <ProfileList
              title="Repos"
              items={repoList}
              onPreviewClick={this.handleRepoPreview}
              onRemoveClick={this.handleRepoRemove}
            />
          </div>
          <div className={b('users')}>
            <ProfileList
              title="Users"
              items={userList}
              onPreviewClick={this.handleUserPreview}
              onRemoveClick={this.handleUserRemove}
            />
          </div>
          {this.renderActiveRepository()}
          {this.renderActiveUser()}
        </div>
      </div>
    );
  }

  @autobind
  private handleRepoPreview(id: number) {
    this.setState({ displayedRepoId: id });
  }

  @autobind
  private handleRepoPreviewClose() {
    this.setState({ displayedRepoId: null });
  }

  @autobind
  private handleUserPreview(id: number) {
    this.setState({ displayedUserId: id });
  }

  @autobind
  private handleUserPreviewClose() {
    this.setState({ displayedUserId: null });
  }

  @autobind
  private handleRepoRemove(id: number) {
    this.props.removeRepo(id);
  }

  @autobind
  private handleRepoSave(repo: ISavedRepository) {
    const { saveRepo } = this.props;
    saveRepo(repo);
  }

  @autobind
  private handleUserRemove(id: number) {
    this.props.removeUser(id);
  }

  @autobind
  private handleUserSave(user: ISavedGithubUser) {
    this.props.saveUser(user);
  }

  @autobind
  private handleRepoOwnerClick(id: number) {
    this.setState({ displayedUserId: id });
  }

  @autobind
  private renderActiveRepository() {
    const { repos } = this.props;
    const { displayedRepoId } = this.state;
    const repo = repos.find(({ id }) => id === displayedRepoId);

    if (!repo || !displayedRepoId) {
      return null;
    }

    return (
      <ProfileRepositoryPreview
        id={displayedRepoId}
        onClose={this.handleRepoPreviewClose}
        onRemoveButtonClick={this.handleRepoRemove}
        onSaveButtonClick={this.handleRepoSave}
        onOwnerClick={this.handleRepoOwnerClick}
      />
    );
  }

  @autobind
  private renderActiveUser() {
    const { users, UserDetails } = this.props;
    const { displayedUserId } = this.state;
    const user = users.find(({ id }) => id === displayedUserId);
    if (!displayedUserId) {
      return;
    }

    return (
      <UserDetails
        id={Number(displayedUserId)}
        onClose={this.handleUserPreviewClose}
        isSaved={user ? true : false}
        onRemoveButtonClick={this.handleUserRemove}
        onSaveButtonClick={this.handleUserSave}
      />
    );
  }
}

const connectedComponent = connect(
  mapState,
  mapDispatch,
)(ProfileSavedList);

export default containersProvider(['UserDetails'])(connectedComponent);
