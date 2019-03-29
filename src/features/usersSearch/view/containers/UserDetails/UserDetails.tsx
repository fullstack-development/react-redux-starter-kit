import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { IDetailedGithubUser } from 'shared/types/models';
import { Dialog } from 'shared/view/components';
import { Typography, Preloader } from 'shared/view/elements';

import { UserAttribute } from '../../components';
import { injectSizeToAvatarURL } from '../../../helpers';
import { actions, selectors } from './../../../redux';
import './UserDetails.scss';

interface IOwnProps {
  username: string;
  onClose(): void;
}

interface IStateProps {
  userDetails: IDetailedGithubUser | null;
  isLoadUserDetailsRequesting: boolean;
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps & IOwnProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    userDetails: selectors.selectUserDetails(state),
    isLoadUserDetailsRequesting: selectors.selectCommunication(state, 'loadUserDetails').isRequesting,
  };
}

const mapDispatch = {
  loadUserDetails: actions.loadUserDetails,
};

const b = block('user-details');

class UserDetails extends React.Component<IProps> {
  private avatarSize = 230;

  public render() {
    const { isLoadUserDetailsRequesting } = this.props;
    return (
      <Dialog
        open={true}
        title="User details"
        onEnter={this.handleDialogEnter}
        onClose={this.handleDialogClose}
      >
        <Dialog.Content>
          <div className={b()}>
            <Preloader size={80} isShown={isLoadUserDetailsRequesting} backgroundColor="#fff" />
            {this.renderContent()}
          </div>
        </Dialog.Content>
      </Dialog>
    );
  }

  private renderContent() {
    const { userDetails } = this.props;
    if (userDetails) {
      const {
        htmlURL, avatarURL, realName, username, location,
        followersNumber, followingNumber, reposNumber,
      } = userDetails;
      return (
        <>
          <a href={htmlURL} className={b('main')} target="_blank">
            <img
              className={b('avatar')}
              src={injectSizeToAvatarURL(avatarURL, this.avatarSize)}
            />
            <Typography variant="h5">{realName}</Typography>
            <Typography variant="subtitle1">{username}</Typography>
            {location && <Typography variant="subtitle2" color="textSecondary">{location}</Typography>}
          </a>
          <div className={b('attributes')}>
            <UserAttribute URL={`${htmlURL}/followers`} title="Followers" value={followersNumber} />
            <UserAttribute URL={`${htmlURL}/following`} title="Following" value={followingNumber} />
            <UserAttribute URL={`${htmlURL}/repositories`} title="Repositories" value={reposNumber} />
          </div>
        </>
      );
    }

    return null;
  }

  @bind
  private handleDialogEnter() {
    const { username, loadUserDetails } = this.props;
    loadUserDetails(username);
  }

  @bind
  private handleDialogClose() {
    const { onClose } = this.props;
    onClose();
  }
}

export { UserDetails, IProps as IUserDetailsProps };
export default connect(mapState, mapDispatch)(UserDetails);
