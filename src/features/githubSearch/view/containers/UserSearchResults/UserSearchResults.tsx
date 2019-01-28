import * as React from 'react';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';
import { IUser } from 'shared/types/models';

import { UserAvatarsWall } from '../../components';
import { selectors } from './../../../redux';

interface IStateProps {
  users: IUser[];
}

type IProps = IStateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    users: selectors.selectFoundUsers(state),
  };
}

class UserSearchResults extends React.PureComponent<IProps> {
  public render() {
    const { users } = this.props;
    return (
      <div className="user-search-results" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Results</h2>
        <UserAvatarsWall users={users} onAvatarClick={(() => () => 0)()}/>
      </div>
    );
  }
}

export default connect(mapState)(UserSearchResults);
