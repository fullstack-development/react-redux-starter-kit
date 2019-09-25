import React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { IGithubUser, IDetailedGithubUser } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { PaginationControls } from 'shared/view/components';
import { TotalSearchResults } from 'shared/view/elements';

import { IUsersSearchFormFields } from '../../../namespace';
import { UsersAvatarsWall } from '../../components';
import { actions, selectors } from './../../../redux';
import UserDetails from '../UserDetails/UserDetails';
import './UsersSearchResults.scss';

interface IState {
  displayedUser: string | null;
}

interface IOwnProps {
  searchOptions: IUsersSearchFormFields;
  savedUsers: IDetailedGithubUser[];
  onSave(user: IDetailedGithubUser | null): void;
  onRemove(id: number): void;
}

interface IStateProps {
  users: IGithubUser[];
  paginationState: IPaginationState;
  totalResults: number;
}

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    users: selectors.selectFoundUsers(state),
    paginationState: selectors.selectUsersSearchPaginationState(state),
    totalResults: selectors.selectTotalResults(state),
  };
}

const mapDispatch = {
  searchUsers: actions.searchUsers,
};

const b = block('users-search-results');

class UsersSearchResults extends React.PureComponent<IProps> {
  public state: IState = {
    displayedUser: null,
  };

  public render() {
    const {
      users,
      paginationState: { page, totalPages },
      totalResults,
      t,
      onSave,
      onRemove,
    } = this.props;
    const { displayedUser } = this.state;
    return (
      <div className={b()}>
        <TotalSearchResults
          title={t(tKeys.shared.totalResults)}
          totalResults={totalResults}
        />
        <UsersAvatarsWall
          users={users}
          onAvatarClick={this.handleUserAvatarClick}
        />
        <div className={b('pagination')}>
          <PaginationControls
            totalPages={totalPages}
            currentPage={page}
            onPageRequest={this.handlePageRequest}
          />
        </div>
        {displayedUser && (
          <UserDetails
            username={displayedUser}
            onClose={this.handleUserDetailsClose}
            onSaveButtonClick={onSave}
            onRemoveButtonClick={onRemove}
            isSaved={this.userIsSaved()}
          />
        )}
      </div>
    );
  }

  @autobind
  private handlePageRequest(pageNumber: number) {
    const { searchUsers, searchOptions } = this.props;
    searchUsers({ searchOptions, page: pageNumber });
  }

  @autobind
  private handleUserAvatarClick({ username }: IGithubUser) {
    this.setState({ displayedUser: username });
  }

  @autobind
  private handleUserDetailsClose() {
    this.setState({ displayedUser: null });
  }

  @autobind
  private userIsSaved() {
    const { savedUsers } = this.props;
    const { displayedUser } = this.state;

    const user = savedUsers.find(({ username }) => username === displayedUser);

    return user ? true : false;
  }
}

const connectedComponent = connect(
  mapState,
  mapDispatch,
)(UsersSearchResults);
export { UsersSearchResults, IProps as IUsersSearchResultsProps };
export default withTranslation()(connectedComponent);
