import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
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
  selectedUserUsername: string | null;
}

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

class UsersSearchResults extends React.PureComponent<IProps, IState> {
  public state: IState = {
    selectedUserUsername: null,
  };

  public render() {
    const { users } = this.props;
    const { selectedUserUsername } = this.state;
    return (
      <div className={b()}>
        <UserAvatarsWall users={users} onAvatarClick={this.handleUserAvatarClick} />
        {this.renderPagination()}
        {selectedUserUsername && <UserDetails username={selectedUserUsername} onClose={this.handleUserDetailsClose}/>}
      </div>
    );
  }

  private renderPagination() {
    const { paginationState: { totalPages, page } } = this.props;
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
  private handlePageRequest(page: number) {
    const { searchUser, searchOptions } = this.props;
    searchUser({ searchOptions, page });
  }

  @bind
  private handleUserAvatarClick({ username }: IGithubUser) {
    this.setState({ selectedUserUsername: username });
  }

  @bind
  private handleUserDetailsClose() {
    this.setState({ selectedUserUsername: null });
  }
}

export default connect(mapState, mapDispatch)(UsersSearchResults);
