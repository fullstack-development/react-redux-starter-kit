import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import block from 'bem-cn';

import { IAppReduxState } from 'shared/types/app';
import { IGithubUser } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';

import { IUsersSearchFormFields } from '../../../namespace';
import { UserAvatarsWall } from '../../components';
import { actions, selectors } from './../../../redux';
import UserDetails from '../UserDetails/UserDetails';
import './UsersSearchResults.scss';

interface IOwnProps {
  searchOptions: IUsersSearchFormFields;
}

interface IStateProps {
  users: IGithubUser[];
  paginationState: IPaginationState;
}

interface IActionProps {
  searchUser: typeof actions.searchUser;
}

type IProps = IOwnProps & IStateProps & IActionProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    users: selectors.selectFoundUsers(state),
    paginationState: selectors.selectUsersSearchPaginationState(state),
  };
}

function mapDispatch(dispatch: Dispatch) {
  return bindActionCreators({
    searchUser: actions.searchUser,
  }, dispatch);
}

const b = block('users-search-results');

function UsersSearchResults(props: IProps) {
  const [displayedUser, setDisplayedUser] = useState<string | null>(null);
  const { users, paginationState: { page, totalPages } } = props;

  return (
    <div className={b()}>
      <UserAvatarsWall users={users} onAvatarClick={handleUserAvatarClick} />
      <div className={b('pagination')}>
        <PaginationControls
          totalPages={totalPages}
          currentPage={page}
          onPageRequest={handlePageRequest}
        />
      </div>
      {displayedUser && <UserDetails username={displayedUser} onClose={handleUserDetailsClose}/>}
    </div>
  );

  function handlePageRequest(pageNumber: number) {
    const { searchUser, searchOptions } = props;
    searchUser({ searchOptions, page: pageNumber });
  }

  function handleUserAvatarClick({ username }: IGithubUser) {
    setDisplayedUser(username);
  }

  function handleUserDetailsClose() {
    setDisplayedUser(null);
  }
}

export default connect(mapState, mapDispatch)(UsersSearchResults);
