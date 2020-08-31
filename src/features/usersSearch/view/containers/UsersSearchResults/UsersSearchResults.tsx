import React from 'react';
import {connect} from 'react-redux';
import block from 'bem-cn';
import {autobind} from 'core-decorators';

import {withTranslation, ITranslationProps, tKeys} from 'services/i18n';
import {IAppReduxState} from 'shared/types/app';
import {IGithubUser} from 'shared/types/models';
import {IPaginationState} from 'shared/types/common';
import {SearchResults} from 'shared/view/components';

import {IUsersSearchFormFields} from '../../../namespace';
import {UsersAvatarsWall} from '../../components';
import {actionCreators, selectors} from './../../../redux';
import {UserDetails} from '../UserDetails/UserDetails';

type PerPage = 30 | 50 | 100;

interface IState {
  displayedUser: string | null;
  perPage: PerPage
}

interface IOwnProps {
  searchOptions: IUsersSearchFormFields;
}

interface IStateProps {
  users: IGithubUser[];
  paginationState: IPaginationState;
  totalResults: number;
  isSearchRequesting: boolean;
}

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    users: selectors.selectFoundUsers(state),
    paginationState: selectors.selectUsersSearchPaginationState(state),
    totalResults: selectors.selectTotalResults(state),
    isSearchRequesting: selectors.selectCommunication(state, 'searchUser').isRequesting,
  };
}

const mapDispatch = {
  searchUsers: actionCreators.searchUsers,
};

const b = block('users-search-results');

class UsersSearchResultsComponent extends React.PureComponent<IProps> {
  public state: IState = {
    displayedUser: null,
    perPage: 30
  };

  public render() {
    const {users, paginationState: {page, totalPages}, totalResults, t, isSearchRequesting} = this.props;
    const {displayedUser} = this.state;

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
          results={<UsersAvatarsWall users={users} onAvatarClick={this.handleUserAvatarClick}/>}
        />
        {displayedUser && (
          <UserDetails username={displayedUser} onClose={this.handleUserDetailsClose}/>
        )}
      </div>
    );
  }

  @autobind
  private handlePageRequest(pageNumber: number) {
    const {searchUsers, searchOptions} = this.props;

    searchUsers({searchOptions: {
        ...searchOptions,
        perPage: this.state.perPage
      }, page: pageNumber});
  }

  @autobind
  private handleUserAvatarClick({username}: IGithubUser) {
    this.setState({displayedUser: username});
  }

  @autobind
  private handleUserDetailsClose() {
    this.setState({displayedUser: null});
  }

  @autobind
  private handleChangePerPage(perPage: PerPage) {
    const {searchUsers, searchOptions} = this.props;
    this.setState({perPage});

    searchUsers({
      searchOptions: {
        ...searchOptions,
        perPage
      }, page: 1
    });
  }
}

const connectedComponent = connect(mapState, mapDispatch)(UsersSearchResultsComponent);
const UsersSearchResults = withTranslation()(connectedComponent);

export {UsersSearchResults, UsersSearchResultsComponent, IProps as IUsersSearchResultsProps};
