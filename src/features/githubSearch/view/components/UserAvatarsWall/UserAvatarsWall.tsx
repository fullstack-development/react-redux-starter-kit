import * as React from 'react';
import { bind } from 'decko';

import { IUser } from 'shared/types/models';

interface IProps {
  users: IUser[];
  onAvatarClick(user: IUser): void;
}

class UserAvatarsWall extends React.PureComponent<IProps> {
  public render() {
    const { users } = this.props;
    return (
      <div className="user-avatars-wall" style={{ cursor: 'pointer' }}>
        <ul
          className="avatars"
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            width: '90rem',
            flexWrap: 'wrap',
          }}
        >
          {users.map(this.renderUserAvatar)}
        </ul>
      </div>
    );
  }

  @bind
  private renderUserAvatar(user: IUser, i: number) {
    const { avatarURL } = user;
    return (
      <li
        key={i}
        className="avatar"
        onClick={this.makeAvatarClickHandler(user)}
        style={{ textAlign: 'center', fontSize: '0.7rem', margin: '0.25rem', width: '4rem' }}
      >
        <img src={avatarURL} style={{ width: '100%' }}/>
      </li>
    );
  }

  @bind
  private makeAvatarClickHandler(user: IUser) {
    return () => this.props.onAvatarClick(user);
  }
}

export default UserAvatarsWall;
