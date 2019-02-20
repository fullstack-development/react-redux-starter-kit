import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppReduxState } from 'shared/types/app';
import { IDetailedGithubUser } from 'shared/types/models';
import { Dialog } from 'shared/view/components';
import { Typography, Preloader } from 'shared/view/elements';

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
const avatarSize = 230;

function UserDetails(props: IProps) {
  const { isLoadUserDetailsRequesting, userDetails } = props;
  return (
    <Dialog
      open={true}
      title="User details"
      onEnter={handleDialogEnter}
      onClose={handleDialogClose}
    >
      <div className={b()}>
        <Preloader size={80} isShown={isLoadUserDetailsRequesting} backgroundColor="#fff" />
        {renderContent()}
      </div>
    </Dialog>
  );

  function renderContent() {
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
                src={injectSizeToAvatarURL(avatarURL, avatarSize)}
              />
              <Typography variant="h5">{realName}</Typography>
              <Typography variant="subtitle1">{username}</Typography>
              {location && <Typography variant="subtitle2" color="textSecondary">{location}</Typography>}
            </a>
            <div className={b('attributes')}>
              {renderAttribute(`${htmlURL}/followers`, 'Followers', followersNumber)}
              {renderAttribute(`${htmlURL}/following`, 'Following', followingNumber)}
              {renderAttribute(`${htmlURL}/repositories`, 'Repositories', reposNumber)}
            </div>
          </>
        );
      }

      return null;
    }

  function renderAttribute(URL: string, title: string, value: number) {
    return (
      <a href={URL} target="_blank" className={b('attribute')}>
        {title}
        <span className={b('value')}>{value}</span>
      </a>
    );
  }

  function handleDialogEnter() {
    const { username, loadUserDetails } = props;
    loadUserDetails(username);
  }

  function handleDialogClose() {
    const { onClose } = props;
    onClose();
  }
}

export default connect(mapState, mapDispatch)(UserDetails);
