import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { IAppReduxState } from 'core/types';
import { IProfile } from 'shared/types/models';
import { Popover } from 'shared/view/components';

import { ProfileAvatar } from '../../components';
import { selectors } from '../../../redux';
import './ProfilePreview.scss';

interface IState {
  isOpen: boolean;
}

interface IOwnProps {
  onEditClick(): void;
}

interface IStateProps {
  profile: IProfile;
}

type IProps = IOwnProps & IStateProps;

const b = block('profile-preview');

function mapState(state: IAppReduxState): IStateProps {
  return {
    profile: selectors.selectProfile(state),
  };
}

class ProfilePreview extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isOpen: false,
  };

  private blockRef = React.createRef<HTMLDivElement>();

  public render() {
    const { profile: { avatarURL, name, nickname, age, bio }, onEditClick } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={b()} ref={this.blockRef}>
        <div className={b('avatar')} onClick={this.handleAvatarClick}>
          <ProfileAvatar avatarURL={avatarURL} size="small" />
        </div>
        <Popover
          open={isOpen}
          onClose={this.handlePopoverClose}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          anchorEl={this.blockRef.current}
        >
          <div className={b('info')}>
            <div className={b('main-info')}>
              <div className={b('name')}>
                {name}
              </div>
              <div className={b('nickname-age')}>
                <div className={b('nickname')}>
                  {nickname}
                </div>
                <div className={b('age')}>
                  {age} y.o.
                </div>
              </div>
            </div>
            <div className={b('bio')}>
              {bio}
            </div>
            <div className={b('edit')} onClick={onEditClick}>
              Edit
            </div>
          </div>
        </Popover>
      </div>
    );
  }

  @bind
  private handlePopoverClose() {
    this.setState({ isOpen: false });
  }

  @bind
  private handleAvatarClick() {
    this.setState({ isOpen: true });
  }

}

export default connect(mapState)(ProfilePreview);
