import React, { useState } from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { containersProvider, IContainerTypes } from 'core';
import { IAppReduxState } from 'shared/types/app';
import { IRepository } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';

import { IRepositoriesSearchFormFields } from '../../../namespace';
import { actions, selectors } from './../../../redux';
import { RepositoryPreview } from '../../components';
import './RepositoriesSearchResults.scss';

interface IOwnProps {
  searchOptions: IRepositoriesSearchFormFields;
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

function RepositoriesSearchResults(props: IProps) {
  const [displayedRepositoryOwner, setDisplayedRepositoryOwner] = useState<string | null>(null);
  const { repositories, UserDetails, paginationState: { totalPages, page } } = props;

  return (
    <div className={b()}>
      {repositories.map(renderRepositoryPreview)}
      <div className={b('pagination')}>
        <PaginationControls
          totalPages={totalPages}
          currentPage={page}
          onPageRequest={handlePageRequest}
        />
      </div>
      {displayedRepositoryOwner &&
        <UserDetails username={displayedRepositoryOwner} onClose={handleUserDetailsClose} />
      }
    </div>
  );

  function renderRepositoryPreview(repository: IRepository) {
    return (
      <div className={b('repository-preview')} key={repository.id}>
        <RepositoryPreview repository={repository} onOwnerClick={handleRepositoryOwnerClick}/>
      </div>
    );
  }

  function handleRepositoryOwnerClick(username: string) {
    setDisplayedRepositoryOwner(username);
  }

  function handleUserDetailsClose() {
    setDisplayedRepositoryOwner(null);
  }

  function handlePageRequest(pageNumber: number) {
    const { searchRepositories, searchOptions } = props;
    searchRepositories({ searchOptions, page: pageNumber });
  }
}

export default connect(mapState, mapDispatch)(containersProvider(['UserDetails'])(RepositoriesSearchResults));
