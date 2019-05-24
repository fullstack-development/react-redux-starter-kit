import React from 'react';
import { autobind } from 'core-decorators';
import block from 'bem-cn';
import * as R from 'ramda';

import { IGithubUser } from 'shared/types/models';
import { Preloader } from 'shared/view/elements';

import { injectSizeToAvatarURL } from '../../../helpers';
import './UsersAvatarsWall.scss';

interface IState {
  areAllAvatarsLoaded: boolean;
}

interface IProps {
  users: IGithubUser[];
  onAvatarClick(user: IGithubUser): void;
}

const b = block('users-avatars-wall');

class UsersAvatarsWall extends React.PureComponent<IProps> {
  public state: IState = {
    areAllAvatarsLoaded: false,
  };

  private avatarSize = 70;

  private get wallSize() {
    const usersNumber = this.props.users.length;
    if (usersNumber <= 50) {
      return 'small';
    }
    return 'big';
  }

  private get areAllAvatarsLoaded() {
    return Object.values(this.avatarsLoadingStatus).every(x => x === true);
  }

  // { avatarURL: true/false };
  private avatarsLoadingStatus: Record<string, boolean> = (() => {
    const { users } = this.props;
    const avatarsURLs = users.map(x => x.avatarURL);
    return R.zipObj(avatarsURLs, Array(users.length).fill(false));
  })();

  public componentDidUpdate({ users: prevUsers }: IProps) {
    const { users } = this.props;
    if (users !== prevUsers) {
      const currentAvatarsURLs = users.map(x => x.avatarURL);
      const prevAvatarsURLs = prevUsers.map(x => x.avatarURL);

      const addedAvatarsURLs = R.difference(currentAvatarsURLs, prevAvatarsURLs);
      const existingAvatarsURLs = R.without(addedAvatarsURLs, currentAvatarsURLs);

      this.avatarsLoadingStatus = {
        ...R.zipObj(existingAvatarsURLs, existingAvatarsURLs.map(x => this.avatarsLoadingStatus[x])),
        ...R.zipObj(addedAvatarsURLs, Array(addedAvatarsURLs.length).fill(false)),
      };

      if (!this.areAllAvatarsLoaded) {
        this.setState({ areAllAvatarsLoaded: false });
      }
    }
  }

  public render() {
    const { users } = this.props;
    const { areAllAvatarsLoaded } = this.state;
    return users.length > 0 && (
      <div className={b()}>
        <ul className={b('avatars', { size: this.wallSize })}>
          <Preloader isShown={!areAllAvatarsLoaded} size={100} backgroundColor="#fff"/>
          {users.map(this.renderUserAvatar)}
        </ul>
      </div>
    );
  }

  @autobind
  private renderUserAvatar(user: IGithubUser) {
    const { avatarURL } = user;
    return (
      <li
        key={user.id}
        className={b('avatar')}
        onClick={this.makeAvatarClickHandler(user)}
      >
        <img
          className={b('image')}
          src={injectSizeToAvatarURL(avatarURL, this.avatarSize)}
          onLoad={this.makeImageOnLoadHandler(user.avatarURL)}
        />
      </li>
    );
  }

  @autobind
  private makeAvatarClickHandler(user: IGithubUser) {
    return () => this.props.onAvatarClick(user);
  }

  @autobind
  private makeImageOnLoadHandler(avatarURL: string) {
    return () => {
      this.avatarsLoadingStatus = { ...this.avatarsLoadingStatus, [avatarURL]: true };

      if (this.areAllAvatarsLoaded) {
        this.setState({ areAllAvatarsLoaded: true });
      }
    };
  }
}

export { IProps as IUsersAvatarsWallProps };
export default UsersAvatarsWall;
