import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { containersProvider, IContainerTypes } from 'core';
import { IAppReduxState } from 'shared/types/app';
import { IRepository } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { SearchResults} from 'shared/view/components';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { Preloader } from 'shared/view/elements';

import { IRepositoriesSearchFormFields } from '../../../namespace';
import { actionCreators, selectors } from './../../../redux';
import { RepositoryPreview } from '../../components';
import './RepositoriesSearchResults.scss';

type PerPage = 30 | 50 | 100;

interface IState {
  displayedRepositoryOwner: string | null;
  perPage: PerPage;
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

type IProps = IOwnProps & IStateProps & IActionProps & IContainerProps & ITranslationProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    repositories: selectors.selectFoundRepositories(state),
    paginationState: selectors.selectRepositoriesSearchPaginationState(state),
    totalResults: selectors.selectTotalResults(state),
    isSearchRequesting: selectors.selectCommunication(state, 'searchRepositories').isRequesting,
  };
}

const mapDispatch = {
  searchRepositories: actionCreators.searchRepositories,
};

const b = block('repositories-search-results');

class RepositoriesSearchResultsComponent extends React.PureComponent<IProps> {
  public state: IState = {
    displayedRepositoryOwner: null,
    perPage: 30
  };

  public render() {
    const {
      repositories, UserDetails, paginationState: { totalPages, page}, t, totalResults,
      isSearchRequesting,
    } = this.props;
    const { displayedRepositoryOwner } = this.state;
    return (
      <div className={b()}>
        <SearchResults
          title={t(tKeys.shared.searchResults)}
          totalResults={totalResults}
          totalPages={totalPages}
          currentPage={page}
          onPageRequest={this.handlePageRequest}
          onChangePerPage={this.handleChangePerPage}
          isSearchRequesting={isSearchRequesting}
          results={
            <main className={b('repositories')}>
              <Preloader size={0} backgroundColor="rgba(0, 0, 0, 0.05)" isShown={isSearchRequesting} />
              {repositories.map(this.renderRepositoryPreview)}
            </main>
          }
        />
        {displayedRepositoryOwner && (
          <UserDetails
            username={displayedRepositoryOwner}
            onClose={this.handleUserDetailsClose}
          />
        )}
      </div>
    );
  }

  @autobind
  private renderRepositoryPreview(repository: IRepository) {
    return (
      <div className={b('repository-preview')} key={repository.id}>
        <RepositoryPreview repository={repository} onOwnerClick={this.handleRepositoryOwnerClick} />
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
    searchRepositories({searchOptions: {
      ...searchOptions,
        perPage: this.state.perPage
    }, page: pageNumber });
  }

  @autobind
  private handleChangePerPage(perPage: PerPage) {
    const { searchRepositories, searchOptions } = this.props;
      searchRepositories({ searchOptions: {
        ...searchOptions,
        perPage
      }, page: 1 });
  }
}

const connectedComponent = connect(mapState, mapDispatch)(RepositoriesSearchResultsComponent);
const RepositoriesSearchResults = withTranslation()(
  containersProvider(['UserDetails'])(connectedComponent),
);

export {
  RepositoriesSearchResults,
  RepositoriesSearchResultsComponent,
  IProps as IRepositoriesSearchResultsProps,
  IState as IRepositoriesSearchResultsState,
};
