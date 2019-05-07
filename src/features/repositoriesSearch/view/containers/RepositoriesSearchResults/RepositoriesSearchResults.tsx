import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { containersProvider, IContainerTypes } from 'core';
import { IAppReduxState } from 'core/types';
import { IRepository } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';
import { TotalSearchResults, Preloader } from 'shared/view/elements';

import { IRepositoriesSearchFormFields } from '../../../namespace';
import { actions, selectors } from './../../../redux';
import { RepositoryPreview } from '../../components';
import './RepositoriesSearchResults.scss';

interface IState {
  displayedRepositoryOwner: string | null;
}

interface IOwnProps {
  searchOptions: IRepositoriesSearchFormFields;
}

interface IStateProps {
  repositories: IRepository[];
  paginationState: IPaginationState;
  totalResults: number;
  isSearchRequesting: boolean;
}

type IActionProps = typeof mapDispatch;

interface IContainerProps {
  UserDetails: IContainerTypes['UserDetails'];
}

type IProps = IOwnProps & IStateProps & IActionProps & IContainerProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    repositories: selectors.selectFoundRepositories(state),
    paginationState: selectors.selectRepositoriesSearchPaginationState(state),
    totalResults: selectors.selectTotalResults(state),
    isSearchRequesting: selectors.selectCommunication(state, 'searchRepositories').isRequesting,
  };
}

const mapDispatch = {
  searchRepositories: actions.searchRepositories,
};

const b = block('repositories-search-results');

class RepositoriesSearchResults extends React.PureComponent<IProps> {
  public state: IState = {
    displayedRepositoryOwner: null,
  };

  public render() {
    const {
      repositories, UserDetails, paginationState: { totalPages, page },
      totalResults, isSearchRequesting,
    } = this.props;
    const { displayedRepositoryOwner } = this.state;
    return (
      <div className={b()}>
        <TotalSearchResults totalResults={totalResults} />
        <div className={b('repositories')}>
          <Preloader size={0} backgroundColor="rgba(0, 0, 0, 0.05)" isShown={isSearchRequesting} />
          {repositories.map(this.renderRepositoryPreview)}
        </div>
        <div className={b('pagination')}>
          <PaginationControls
            totalPages={totalPages}
            currentPage={page}
            onPageRequest={this.handlePageRequest}
          />
        </div>
        {displayedRepositoryOwner &&
          <UserDetails username={displayedRepositoryOwner} onClose={this.handleUserDetailsClose} />
        }
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
    this.setState({ displayedRepositoryOwner: username });
  }

  @bind
  private handleUserDetailsClose() {
    this.setState({ displayedRepositoryOwner: null });
  }

  @bind
  private handlePageRequest(pageNumber: number) {
    const { searchRepositories, searchOptions } = this.props;
    searchRepositories({ searchOptions, page: pageNumber });
  }
}

export {
  RepositoriesSearchResults,
  IProps as IRepositoriesSearchResultsProps,
  IState as IRepositoriesSearchResultsState,
};
export default connect(mapState, mapDispatch)(containersProvider(['UserDetails'])(RepositoriesSearchResults));
