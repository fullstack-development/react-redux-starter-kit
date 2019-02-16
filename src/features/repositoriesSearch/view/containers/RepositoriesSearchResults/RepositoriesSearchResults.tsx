import * as React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { bind } from 'decko';

import { containersProvider, IContainerTypes } from 'core';
import { IAppReduxState } from 'shared/types/app';
import { IRepository } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';

import { IRepositoriesSearchFormFields } from '../../../namespace';
import { actions, selectors } from './../../../redux';
import { RepositoryPreview } from '../../components';
import './RepositoriesSearchResults.scss';

interface IState {
  displayedUserUsername: string | null;
}

interface IOwnProps {
  repositoriesSearchQueryOptions: IRepositoriesSearchFormFields;
}

interface IStateProps {
  repositories: IRepository[];
  paginationState: IPaginationState;
}

interface IActionProps {
  searchRepositories: typeof actions.searchRepositories;
}

interface IContainerProps {
  UserDetails: IContainerTypes['UserDetails'];
}

type IProps = IOwnProps & IStateProps & IActionProps & IContainerProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    repositories: selectors.selectFoundRepositories(state),
    paginationState: selectors.selectRepositoriesSearchPaginationState(state),
  };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    searchRepositories: actions.searchRepositories,
  }, dispatch);
}

const b = block('repositories-search-results');

class RepositoriesSearchResults extends React.PureComponent<IProps, IState> {
  public state: IState = {
    displayedUserUsername: null,
  };

  public render() {
    const { repositories, UserDetails } = this.props;
    const { displayedUserUsername } = this.state; // TODO
    return (
      <div className={b()}>
        {repositories.map(this.renderRepositoryPreview)}
        {this.renderPagination()}
        {displayedUserUsername &&
        <UserDetails username={displayedUserUsername} onClose={this.handleUserDetailsClose} />}
      </div>
    );
  }

  private renderPagination() {
    const { paginationState: { page, totalPages } } = this.props;
    return (
      <div className={b('pagination')}>
        <PaginationControls
          totalPages={totalPages}
          currentPage={page}
          onPageRequest={this.handlePageRequest}
        />
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

  @bind
  private handlePageRequest(page: number) {
    const { searchRepositories, repositoriesSearchQueryOptions } = this.props;
    searchRepositories({ ...repositoriesSearchQueryOptions, page });
  }
}

export default connect(mapState, mapDispatch)(containersProvider(['UserDetails'])(RepositoriesSearchResults));
