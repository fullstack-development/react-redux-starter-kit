import * as React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { containersProvider, IContainerTypes } from 'core';
import { IAppReduxState } from 'shared/types/app';
import { IRepository } from 'shared/types/models';

import { selectors } from './../../../redux';
import { RepositoryPreview } from '../../components';
import './RepositoriesSearchResults.scss';

interface IState {
  displayedUserUsername: string | null;
}

interface IStateProps {
  repositories: IRepository[] | null;
}

interface IContainerProps {
  UserDetails: IContainerTypes['UserDetails'];
}

type IProps = IStateProps & IContainerProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    repositories: selectors.selectFoundRepositories(state),
  };
}

const b = block('repositories-search-results');

class RepositoriesSearchResults extends React.PureComponent<IProps, IState> {
  public state: IState = {
    displayedUserUsername: null,
  };

  public render() {
    const { repositories, UserDetails } = this.props;
    const { displayedUserUsername } = this.state;
    return repositories && (
      <div className={b()}>
        {repositories.map(this.renderRepositoryPreview)}
        <UserDetails username={displayedUserUsername} onClose={this.handleUserDetailsClose} />
      </div>
    );
  }

  @bind
  private renderRepositoryPreview(repository: IRepository) {
    return (
      <div className={b('repository-preview')} key={repository.id}>
        <RepositoryPreview repository={repository} onOwnerClick={this.handleRepositoryOwnerClick}/>
      </div>
    );
  }

  @bind
  private handleRepositoryOwnerClick(username: string) {
    this.setState({ displayedUserUsername: username });
  }

  @bind
  private handleUserDetailsClose() {
    this.setState({ displayedUserUsername: null });
  }
}

export default connect(mapState)(containersProvider(['UserDetails'])(RepositoriesSearchResults));
