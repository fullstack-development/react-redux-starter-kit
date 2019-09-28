import React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import { ISavedGithubUser, ISavedRepository } from 'shared/types/models';
import { IAppReduxState } from 'shared/types/app';
import { IContainerTypes, containersProvider } from 'core';

import { ProfileRepositoryPreview } from '../../containers';
import { ProfileList } from '../../components';
import { selectors, actions } from '../../../redux';

import './ProfileSavedList';

interface IStateProps {
  repos: ISavedRepository[];
  users: ISavedGithubUser[];
}

type IActionProps = typeof mapDispatch;
type IContainerProviderProps = {
  UserDetails: IContainerTypes['UserDetails'];
};

type IProps = IStateProps & IActionProps & IContainerProviderProps;

interface IState {
  activeUserId: number | null;
  activeRepoId: number | null;
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
};

const b = block('profile-saved-list');

import './ProfileSavedList.scss';

class ProfileSavedList extends React.Component<IProps, IState> {
  public state = {
    activeUserId: null,
    activeRepoId: null,
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
          <div></div>
          {this.renderActiveRepository()}
          {this.renderActiveUser()}
        </div>
      </div>
    );
  }

  @autobind
  private handleRepoPreview(id: number) {
    this.setState({ activeRepoId: id });
  }

  @autobind
  private handleUserPreview(id: number) {
    this.setState({ activeUserId: id });
  }

  @autobind
  private handleUserPreviewClose() {
    this.setState({ activeUserId: null });
  }

  @autobind
  private handleRepoRemove(id: number) {
    this.props.removeRepo(id);
  }

  @autobind
  private handleUserRemove(id: number) {
    this.props.removeUser(id);
  }

  @autobind
  private renderActiveRepository() {
    const { repos } = this.props;
    const { activeRepoId } = this.state;
    const repo = repos.find(({ id }) => id === activeRepoId);

    if (!repo) {
      return null;
    }

    //return <RepositoryPreview repository={repo} isSaved={true} />;
    return <ProfileRepositoryPreview />;
  }

  @autobind
  private renderActiveUser() {
    const { users, UserDetails } = this.props;
    const { activeUserId } = this.state;
    const user = users.find(({ id }) => id === activeUserId);

    if (!user) return null;

    return (
      <UserDetails
        username={user.username}
        onClose={this.handleUserPreviewClose}
        isSaved={true}
        onRemoveButtonClick={this.handleUserRemove}
      />
    );
  }
}

const connectedComponent = connect(
  mapState,
  mapDispatch,
)(ProfileSavedList);

export default containersProvider(['UserDetails'])(connectedComponent);
