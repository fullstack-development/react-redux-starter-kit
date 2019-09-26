import React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import { IDetailedGithubUser, IRepository } from 'shared/types/models';
import { IAppReduxState } from 'shared/types/app';

import { ProfileList } from '../../components';

import { selectors, actions } from '../../../redux';

interface IStateProps {
  repos: IRepository[];
  users: IDetailedGithubUser[];
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps;

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
  private handleRepoRemove(id: number) {
    this.props.removeRepo(id);
  }

  @autobind
  private handleUserRemove(id: number) {
    this.props.removeUser(id);
  }
}

export default connect(
  mapState,
  mapDispatch,
)(ProfileSavedList);
