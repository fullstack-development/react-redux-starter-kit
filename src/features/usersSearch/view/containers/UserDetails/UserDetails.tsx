import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppReduxState } from 'shared/types/app';
import { IDetailedUser } from 'shared/types/models';
import { Dialog } from 'shared/view/components';
import { Typography, Preloader } from 'shared/view/elements';

import { injectSizeToAvatarURL } from '../../../helpers';
import { actions, selectors } from './../../../redux';
import './UserDetails.scss';

interface IOwnProps {
  username: string | null;
  onClose(): void;
}

interface IStateProps {
  userDetails: IDetailedUser | null;
  isLoadUserDetailsRequesting: boolean;
}

interface IActionProps {
  loadUserDetails: typeof actions.loadUserDetails;
}

type IProps = IStateProps & IActionProps & IOwnProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    userDetails: selectors.selectUserDetails(state),
    isLoadUserDetailsRequesting: selectors.selectCommunication(state, 'loadUserDetails').isRequesting,
  };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    loadUserDetails: actions.loadUserDetails,
  }, dispatch);
}

const b = block('user-details');

class UserDetails extends React.PureComponent<IProps> {
  private avatarSize = 230;

  public render() {
    const { username, isLoadUserDetailsRequesting } = this.props;
    return (
      <Dialog
        open={username !== null}
        title="User details"
        onEnter={this.handleDialogEnter}
        onClose={this.handleDialogClose}
      >
        <div className={b()}>
          <Preloader size={80} isShown={isLoadUserDetailsRequesting} backgroundColor="#fff" />
          {this.renderContent()}
        </div>
      </Dialog>
    );
  }

  private renderContent() {
    const { userDetails } = this.props;
    if (userDetails) {
      return (
        <>
          {this.renderMain(userDetails)}
          {this.renderAttributes(userDetails)}
        </>
      );
    }
    return null;
  }

  private renderMain(userDetails: IDetailedUser) {
    const { htmlURL, avatarURL, realName, username, location } = userDetails;
    return (
      <a href={htmlURL} className={b('main')} target="_blank">
        <img
          className={b('avatar')}
          src={injectSizeToAvatarURL(avatarURL, this.avatarSize)}
        />
        <Typography variant="h5">{realName}</Typography>
        <Typography variant="subtitle1">{username}</Typography>
        {location && <Typography variant="subtitle2" color="textSecondary">{location}</Typography>}
      </a>
    );
  }

  private renderAttributes(userDetails: IDetailedUser) {
    const { followersNumber, followingNumber, reposNumber, htmlURL } = userDetails;
    return (
      <div className={b('attributes')}>
        <a href={`${htmlURL}/followers`} target="_blank" className={b('attribute')}>
          Followers
          <span className={b('value')}>{followersNumber}</span>
        </a>
        <a href={`${htmlURL}/following`} target="_blank" className={b('attribute')}>
          Following
          <span className={b('value')}>{followingNumber}</span>
        </a>
        <a href={`${htmlURL}/repositories`} target="_blank" className={b('attribute')}>
          Repositories
          {/* TODO: тут можно контейнер провайдером загрузку реп добавить (репы будут справа выезжать по стрелочке) */}
          <span className={b('value')}>{reposNumber}</span>
        </a>
        </div>
    );
  }

  @bind
  private handleDialogEnter() {
    const { username, loadUserDetails } = this.props;
    if (username) {
      loadUserDetails(username);
    }
  }

  @bind
  private handleDialogClose() {
    const { onClose } = this.props;
    onClose();
  }
}

export default connect(mapState, mapDispatch)(UserDetails);
