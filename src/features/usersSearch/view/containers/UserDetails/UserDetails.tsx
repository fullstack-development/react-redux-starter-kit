import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { IAppReduxState } from 'shared/types/app';
import { IDetailedGithubUser } from 'shared/types/models';
import { Dialog } from 'shared/view/components';
import { Typography, Preloader } from 'shared/view/elements';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

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

type IProps = IStateProps & IActionProps & IOwnProps & ITranslationProps;

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
const { userSearch: intl } = tKeys.features;

class UserDetails extends React.Component<IProps> {
  private avatarSize = 230;

  public render() {
    const { isLoadUserDetailsRequesting, t } = this.props;
    return (
      <Dialog
        open={true}
        title={t(intl.userDetails)}
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
    const { userDetails, t } = this.props;
    if (userDetails) {
      const {
        htmlURL, avatarURL, realName, username, location,
        followersNumber, followingNumber, reposNumber,
      } = userDetails;
      return (
        <>
          <a href={htmlURL} className={b('main')} target="_blank" rel="noopener noreferrer">
            <img
              className={b('avatar')}
              src={injectSizeToAvatarURL(avatarURL, this.avatarSize)}
            />
            <Typography variant="h5">{realName}</Typography>
            <Typography variant="subtitle1" noWrap>{username}</Typography>
            {location && <Typography variant="subtitle2" color="textSecondary">{location}</Typography>}
          </a>
          <div className={b('attributes')}>
            <UserAttribute
              URL={`${htmlURL}/followers`}
              title={t(intl.followers)}
              value={followersNumber}
            />
            <UserAttribute
              URL={`${htmlURL}/following`}
              title={t(intl.following)}
              value={followingNumber}
            />
            <UserAttribute
              URL={`${htmlURL}/repositories`}
              title={t(intl.repositories)}
              value={reposNumber}
            />
          </div>
        </>
      );
    }

    return null;
  }

  @autobind
  private handleDialogEnter() {
    const { username, loadUserDetails } = this.props;
    loadUserDetails(username);
  }

  @autobind
  private handleDialogClose() {
    const { onClose } = this.props;
    onClose();
  }
}

const connectedComponent = connect(mapState, mapDispatch)(UserDetails);

export { UserDetails, IProps as IUserDetailsProps };
export default withTranslation()(connectedComponent);
