import React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { IGithubUser } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';

import { IUsersSearchFormFields } from '../../../namespace';
import { UserAvatarsWall } from '../../components';
import { actions, selectors } from './../../../redux';
import UserDetails from '../UserDetails/UserDetails';
import './UsersSearchResults.scss';

interface IState {
  displayedUser: string | null;
}

interface IOwnProps {
  searchOptions: IUsersSearchFormFields;
}

interface IStateProps {
  users: IGithubUser[];
  paginationState: IPaginationState;
}

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IStateProps & IActionProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    users: selectors.selectFoundUsers(state),
    paginationState: selectors.selectUsersSearchPaginationState(state),
  };
}

const mapDispatch = {
  searchUser: actions.searchUser,
};

const b = block('users-search-results');

class UsersSearchResults extends React.PureComponent<IProps> {
  public state: IState = {
    displayedUser: null,
  };

  public render() {
    const { users, paginationState: { page, totalPages } } = this.props;
    const { displayedUser } = this.state;
    return (
      <div className={b()}>
        <UserAvatarsWall users={users} onAvatarClick={this.handleUserAvatarClick} />
        <div className={b('pagination')}>
          <PaginationControls
            totalPages={totalPages}
            currentPage={page}
            onPageRequest={this.handlePageRequest}
          />
        </div>
        {displayedUser && <UserDetails username={displayedUser} onClose={this.handleUserDetailsClose}/>}
      </div>
    );
  }

  @bind
  private handlePageRequest(pageNumber: number) {
    const { searchUser, searchOptions } = this.props;
    searchUser({ searchOptions, page: pageNumber });
  }

  @bind
  private handleUserAvatarClick({ username }: IGithubUser) {
    this.setState({ displayedUser: username });
  }

  @bind
  private handleUserDetailsClose() {
    this.setState({ displayedUser: null });
  }
}

export default connect(mapState, mapDispatch)(UsersSearchResults);
