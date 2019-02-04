import * as React from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { IUser } from 'shared/types/models';

import { UserAvatarsWall } from '../../components';
import UserDetails from '../UserDetails/UserDetails';
import { selectors } from './../../../redux';
import './UserSearchResults.scss';

interface IState {
  selectedUserUsername: string | null;
}

interface IStateProps {
  users: IUser[];
}

type IProps = IStateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    users: selectors.selectFoundUsers(state),
  };
}

const b = block('user-search-results');

class UserSearchResults extends React.PureComponent<IProps, IState> {
  public state: IState = {
    selectedUserUsername: null,
  };

  public render() {
    const { users } = this.props;
    const { selectedUserUsername } = this.state;
    return (
      <div className={b()}>
        <UserAvatarsWall users={users} onAvatarClick={this.handleUserAvatarClick}/>
        <UserDetails username={selectedUserUsername} onClose={this.handleUserDetailsClose}/>
      </div>
    );
  }

  @bind
  private handleUserAvatarClick({ username }: IUser) {
    this.setState({ selectedUserUsername: username });
  }

  @bind
  private handleUserDetailsClose() {
    this.setState({ selectedUserUsername: null });
  }
}

export default connect(mapState)(UserSearchResults);
