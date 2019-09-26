import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { containersProvider, IContainerTypes } from 'core';
import { IAppReduxState } from 'shared/types/app';
import { IDetailedGithubUser, IRepository } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
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
  savedRepos: IRepository[];
  savedUsers: IDetailedGithubUser[];
  onRepoSave(repo: IRepository): void;
  onRepoRemove(repoId: number): void;
  onUserSave(user: IDetailedGithubUser): void;
  onUserRemove(userId: number): void;
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

type IProps = IOwnProps &
  IStateProps &
  IActionProps &
  IContainerProps &
  ITranslationProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    repositories: selectors.selectFoundRepositories(state),
    paginationState: selectors.selectRepositoriesSearchPaginationState(state),
    totalResults: selectors.selectTotalResults(state),
    isSearchRequesting: selectors.selectCommunication(
      state,
      'searchRepositories',
    ).isRequesting,
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
      repositories,
      UserDetails,
      paginationState: { totalPages, page },
      t,
      totalResults,
      isSearchRequesting,
      onUserSave,
      onUserRemove,
    } = this.props;
    const { displayedRepositoryOwner } = this.state;
    return (
      <div className={b()}>
        <TotalSearchResults
          title={t(tKeys.shared.totalResults)}
          totalResults={totalResults}
        />
        <div className={b('repositories')}>
          <Preloader
            size={0}
            backgroundColor="rgba(0, 0, 0, 0.05)"
            isShown={isSearchRequesting}
          />
          {repositories.map(this.renderRepositoryPreview)}
        </div>
        <div className={b('pagination')}>
          <PaginationControls
            totalPages={totalPages}
            currentPage={page}
            onPageRequest={this.handlePageRequest}
          />
        </div>
        {displayedRepositoryOwner && (
          <UserDetails
            username={displayedRepositoryOwner}
            onClose={this.handleUserDetailsClose}
            onSaveButtonClick={onUserSave}
            onRemoveButtonClick={onUserRemove}
            isSaved={this.userIsSaved()}
          />
        )}
      </div>
    );
  }

  @autobind
  private renderRepositoryPreview(repository: IRepository) {
    const { onRepoSave, onRepoRemove } = this.props;

    return (
      <div className={b('repository-preview')} key={repository.id}>
        <RepositoryPreview
          repository={repository}
          onOwnerClick={this.handleRepositoryOwnerClick}
          onSaveButtonClick={onRepoSave}
          onRemoveButtonClick={onRepoRemove}
          isSaved={this.repoIsSaved(repository.id)}
        />
      </div>
    );
  }

  @autobind
  private handleRepositoryOwnerClick(username: string) {
    this.setState({ displayedRepositoryOwner: username });
  }

  @autobind
  private handleUserDetailsClose() {
    this.setState({ displayedRepositoryOwner: null });
  }

  @autobind
  private handlePageRequest(pageNumber: number) {
    const { searchRepositories, searchOptions } = this.props;
    searchRepositories({ searchOptions, page: pageNumber });
  }

  @autobind
  private repoIsSaved(repoId: number) {
    const { savedRepos } = this.props;
    const repo = savedRepos.find(({ id }) => id === repoId);

    return repo ? true : false;
  }

  @autobind
  private userIsSaved() {
    const { savedUsers } = this.props;
    const { displayedRepositoryOwner } = this.state;

    const user = savedUsers.find(
      ({ username }) => username === displayedRepositoryOwner,
    );

    return user ? true : false;
  }
}

const connectedComponent = connect(
  mapState,
  mapDispatch,
)(RepositoriesSearchResults);

export {
  RepositoriesSearchResults,
  IProps as IRepositoriesSearchResultsProps,
  IState as IRepositoriesSearchResultsState,
};
export default withTranslation()(
  containersProvider(['UserDetails'])(connectedComponent),
);
